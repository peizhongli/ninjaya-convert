/**
 * @name create
 * @desc 创建文件夹相关
 * @createTime 2025/02/11 09:25
 */
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { translateChar } from "./translate";
import { toCamelCase, toPascalCase } from "./convert";
import { generateReactTS, generateReactJS } from "../tpl";

export async function createDir(uri: vscode.Uri) {
  // 获取当前选中的文件夹路径
  if (!uri) {
    return;
  }
  const currentFolder = uri.fsPath;
  // 弹出输入框让用户输入文件夹名称
  const folderName = await vscode.window.showInputBox({
    prompt: "Enter the name of the new folder",
    placeHolder: "Folder name",
  });
  if (!folderName) {
    return;
  }
  const translatedText = await translateChar(folderName);
  // 创建新文件夹
  const newFolderPath = path.join(currentFolder, toCamelCase(translatedText));
  try {
    fs.mkdirSync(newFolderPath);
    vscode.commands.executeCommand(
      "revealInExplorer",
      vscode.Uri.file(currentFolder)
    );
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to create folder: ${error}`);
    return;
  }
  // 弹出选择框让用户选择要生成的文件
  const fileOptions = [
    "index.jsx",
    "index.tsx",
    "index.module.less",
    "constant.js",
  ];
  const selectedFiles = await vscode.window.showQuickPick(fileOptions, {
    canPickMany: true,
    placeHolder: "Select files to generate",
  });
  if (selectedFiles) {
    // 生成选中的文件
    selectedFiles.forEach((file) => {
      let str = "";
      switch (file) {
        case "index.js":
          str = generateReactJS(toPascalCase(translatedText));

          break;
        case "index.ts":
          str = generateReactTS(toPascalCase(translatedText));

          break;
        default:
          break;
      }
      const filePath = path.join(newFolderPath, file);
      fs.writeFile(filePath, str, "utf8", (err) => {
        if (!err) {
          vscode.commands.executeCommand(
            "revealInExplorer",
            vscode.Uri.file(path.join(newFolderPath, file))
          );
        }
      });
    });
  }
  vscode.window.showInformationMessage(`${folderName} has created.😊`);
}
