/**
 * @name convert
 * @desc 转换命名格式相关
 * @createTime 2025/02/11 09:10
 */
import * as vscode from "vscode";
import { translateChar } from "./translate";

// 兼容全大写转回
function initStr(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/_/g, " ")
    .toLowerCase();
}
// 将字符串转换为小驼峰
export function toCamelCase(str: string): string {
  return initStr(str)
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

// 将字符串转换为大驼峰
export function toPascalCase(str: string): string {
  return initStr(str)
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word) {
      return word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

// 将字符串转换为常量
export function toUpperCase(str: string): string {
  return initStr(str).replace(/\s+/g, "_").toUpperCase();
}

export async function convertText(func: any) {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const selection = editor.selection;
    const text = editor.document.getText(selection).trim();
    const translatedText = await translateChar(text);
    if (!translatedText) {
      return;
    }
    const convertedText = func(translatedText);
    editor
      .edit((editBuilder) => {
        editBuilder.replace(selection, convertedText);
      })
      .then((success) => {
        if (!success) {
          vscode.window.showErrorMessage("Failed to replace text.");
        }
      });
  }
}
