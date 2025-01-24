// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { convertText, toCamelCase, toPascalCase, toUpperCase } from "./convert";
import { openInExplorer } from "./open";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // 注册将选中内容转换为小驼峰的命令
  const disposableCamelCase = vscode.commands.registerCommand(
    "ninjaya-convert.convertToCamelCase",
    () => convertText(toCamelCase)
  );

  // 注册将选中内容转换为大驼峰的命令
  const disposablePascalCase = vscode.commands.registerCommand(
    "ninjaya-convert.convertToPascalCase",
    () => convertText(toPascalCase)
  );

  // 注册将选中内容转换为大写的命令
  const disposableUpperCase = vscode.commands.registerCommand(
    "ninjaya-convert.convertToUpperCase",
    () => convertText(toUpperCase)
  );

  // 注册打开资源管理器的命令
  const disposableOpenInExplorer = vscode.commands.registerCommand(
    "extension.openInExplorer",
    () => openInExplorer()
  );

  // 订阅命令
  context.subscriptions.push(
    disposableCamelCase,
    disposablePascalCase,
    disposableUpperCase,
    disposableOpenInExplorer
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
