// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { registerCompletionItem } from './completion-item';
import { registerQuickFix } from './quick-fix';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let completionItemprovider: vscode.Disposable | null = null;
  let quickFixprovider: vscode.Disposable | null = null;

  vscode.workspace.onDidChangeTextDocument(() => {
    completionItemprovider?.dispose();
    completionItemprovider = null;
    completionItemprovider = registerCompletionItem();

    quickFixprovider?.dispose();
    quickFixprovider = null;
    quickFixprovider = registerQuickFix();

    context.subscriptions.push(quickFixprovider);
    context.subscriptions.push(completionItemprovider);
  });
}

// This method is called when your extension is deactivated
export function deactivate() {}
