import * as vscode from 'vscode';

import {
  createImportStatement,
  emptyTextByLine,
  getAppendImportStatement,
  getAst,
  getImportInfoByAst,
  getLastImportDecarationLine,
} from './utils';

import { searchList, documentSelectors } from './constants';

export function registerQuickFix() {
  return vscode.languages.registerCodeActionsProvider(documentSelectors, {
    provideCodeActions(document, range, context) {
      const diagnostic = context.diagnostics.find(
        (diagnostic) => diagnostic.code === 2304,
      );

      if (diagnostic) {
        const info = searchList.find(({ name }) => {
          const match = diagnostic.message.match(name);
          return name === match?.[0];
        });

        if (info) {
          const fix = new vscode.CodeAction(
            `Update import from "primereact/${info.fileName}"`,
            vscode.CodeActionKind.QuickFix,
          );

          fix.edit = new vscode.WorkspaceEdit();
          fix.isPreferred = true;

          const text = emptyTextByLine(
            document.getText(),
            range.start.line + 1,
          );

          const ast = getAst(text);
          const lastImportLine = getLastImportDecarationLine(ast);
          const { importExists, activeImportLine, appendImportStatement } =
            getImportInfoByAst(ast, info.name, info.fileName);

          if (
            importExists &&
            activeImportLine !== null &&
            appendImportStatement
          ) {
            const range = new vscode.Range(
              new vscode.Position(activeImportLine - 1, 0),
              new vscode.Position(activeImportLine - 1, text.length),
            );
            const code = getAppendImportStatement(
              getAst(appendImportStatement),
              info.name,
            );

            fix.edit.replace(document.uri, range, code);
          } else if (!importExists) {
            fix.edit.insert(
              document.uri,
              new vscode.Position(lastImportLine, 0),
              createImportStatement(info.name, info.fileName),
            );

            return [fix];
          }
        }
      }
      return [];
    },
  });
}
