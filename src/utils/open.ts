/**
 * @name open
 * @desc 打开资源管理器相关
 * @createTime 2025/02/11 09:10
 */
import * as vscode from "vscode";
import * as path from "path";
import { exec } from "child_process";

const platform = process.platform;
const isWin = platform === "win32";
const isDarwin = platform === "darwin";
const isLinux = platform === "linux";
export function openInExplorer() {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const document = editor.document;
    const filePath = document.fileName;
    const dirPath = path.dirname(filePath);
    console.log("dirPath :>> ", dirPath);

    // 根据不同操作系统执行相应的打开目录命令
    let command = "";
    if (isWin) {
      command = `explorer "${dirPath}"`;
    } else if (isDarwin) {
      command = `open "${dirPath}"`;
    } else if (isLinux) {
      command = `xdg-open "${dirPath}"`;
    }

    exec(command, (error) => {
      if (error) {
        if (!(isWin && error.code === 1)) {
          vscode.window.showErrorMessage(
            `Failed to open directory: ${error.message}`
          );
        }
      }
    });
  }
}
