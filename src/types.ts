import * as vscode from 'vscode';
export interface ICompletionItem extends vscode.CompletionItem {
  data: {
    fileName: string;
    name: string;
    line: number;
  };
}
