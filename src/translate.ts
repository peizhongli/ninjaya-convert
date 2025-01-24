import * as vscode from "vscode";
import https, { RequestOptions } from "https";
import crypto from "crypto";

const config = vscode.workspace.getConfiguration("ninjaya-convert");
const appID = config.get<string>("appID");
const secretKey = config.get<string>("secretKey");
const targetLanguage = config.get<string>("targetLanguage") as string;
// 封装一个函数用于生成签名
function generateSign(query: string): [number, string] {
  const salt = Math.random();
  const signStr = appID + query + salt + secretKey;
  return [salt, crypto.createHash("md5").update(signStr).digest("hex")];
}

// 封装一个函数用于生成Query
function generateQuery(
  query: string,
  from: string,
  to: string = targetLanguage
): string {
  const [salt, sign] = generateSign(query);
  return `q=${encodeURIComponent(
    query
  )}&from=${from}&to=${to}&appid=${appID}&salt=${salt}&sign=${sign}`;
}

// 封装一个异步函数用于发起 HTTP 请求
function makeRequest(options: RequestOptions): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!appID || !secretKey) {
      vscode.window.showInformationMessage(`未配置appId或secretKey`);
      reject(new Error("未配置appId或secretKey"));
    }
    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk: string) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const result = JSON.parse(data);
          resolve(result);
        } catch (error) {
          reject(new Error("解析响应数据出错: " + (error as Error).message));
        }
      });
    });

    req.on("error", (error: Error) => {
      reject(new Error("请求出错: " + error.message));
    });

    req.end();
  });
}

// 封装一个异步函数用于调用百度翻译 API
export async function translateText(
  query: string,
  from = "auto",
  to = "en"
): Promise<any | null> {
  const params = generateQuery(query, from, to);
  console.log("params :>> ", params);

  const options: RequestOptions = {
    hostname: "fanyi-api.baidu.com",
    path: `/api/trans/vip/translate?${params}`,
    method: "GET",
  };

  try {
    const result = await makeRequest(options);
    if (result.error_code) {
      console.error(
        "翻译失败，错误码：",
        result.error_code,
        "，错误信息：",
        result.error_msg
      );
    } else {
      const translation = result.trans_result
        .map((item: { dst: string }) => item.dst)
        .join("\n");
      console.log(query, "->翻译结果->", translation);
      return { ...result, text: translation };
    }
    return result;
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
}
