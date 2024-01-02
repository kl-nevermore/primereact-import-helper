import * as vscode from 'vscode';
import { documentSelectors } from './constants';
import {
  createImportStatement,
  emptyTextByLine,
  filterComponentsByPrefix,
  getAppendImportStatement,
  getAst,
  getImportInfoByAst,
  getLastImportDecarationLine,
  isUpperCaseFirst,
} from './utils';
import type { ICompletionItem } from './types';

export function registerCompletionItem() {
  return vscode.languages.registerCompletionItemProvider(documentSelectors, {
    provideCompletionItems(document, position) {
      const lineText = document.lineAt(position).text;
      const linePrefix = lineText.substring(0, position.character).trim();

      const list = filterComponentsByPrefix(linePrefix);

      if (list.length === 0) return [];

      const completionItems = list.map(({ name, fileName }) => {
        const item = new vscode.CompletionItem(
          `${name}:primereact`,
        ) as ICompletionItem;

        item.kind = vscode.CompletionItemKind.Variable;
        item.detail = createImportStatement(name, fileName);
        item.sortText = name[0];
        item.data = { fileName, name, line: position.line };

        let insertText = '';

        if (linePrefix.startsWith('<')) {
          insertText = `${name}></${name}>`;
        } else if (isUpperCaseFirst(linePrefix)) {
          insertText = `<${name}></${name}>`;
        } else {
          insertText = name;
        }

        item.insertText = insertText;

        return item;
      });

      return completionItems;
    },
    resolveCompletionItem(item: ICompletionItem) {
      const activeDocument = vscode.window.activeTextEditor;

      if (activeDocument) {
        const document = activeDocument?.document;
        const text = emptyTextByLine(document.getText(), item.data.line);
        const ast = getAst(text);
        const lastImportLine = getLastImportDecarationLine(ast);
        const { importExists, activeImportLine, appendImportStatement } =
          getImportInfoByAst(ast, item.data.name, item.data.fileName);

        if (
          importExists &&
          activeImportLine !== null &&
          appendImportStatement
        ) {
          const code = getAppendImportStatement(
            getAst(appendImportStatement),
            item.data.name,
          );

          const range = new vscode.Range(
            new vscode.Position(activeImportLine - 1, 0),
            new vscode.Position(activeImportLine - 1, text.length),
          );

          item.additionalTextEdits = [vscode.TextEdit.replace(range, code)];
        } else if (!importExists) {
          item.additionalTextEdits = [
            vscode.TextEdit.insert(
              new vscode.Position(lastImportLine, 0),
              createImportStatement(item.data.name, item.data.fileName),
            ),
          ];
        }
      }
      return item;
    },
  });
}
