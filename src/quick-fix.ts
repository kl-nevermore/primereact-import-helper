import * as vscode from 'vscode';
import * as t from '@babel/types';
import traverse from '@babel/traverse';
import { emptyTextByLine, getAst, getLastImportDecarationLine } from './utils';
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

          const text = emptyTextByLine(
            document.getText(),
            range.start.line + 1,
          );
          const ast = getAst(text);
          const lastImportLine = getLastImportDecarationLine(ast);
          let importExists = false;

          traverse(ast, {
            ImportDeclaration(path) {
              importExists = t.isStringLiteral(path.node.source, {
                value: `primereact/${info.fileName}`,
              });
            },
          });

          if (!importExists) {
            const importStatement = `import { ${info.name} } from "primereact/${info.fileName}";\n`;

            fix.edit.insert(
              document.uri,
              new vscode.Position(lastImportLine, 0),
              importStatement,
            );

            fix.isPreferred = true;

            return [fix];
          }
        }
      }
      return [];
    },
  });
}
