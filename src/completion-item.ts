import * as vscode from 'vscode';
import * as t from '@babel/types';
import traverse from '@babel/traverse';
import { documentSelectors } from './constants';
import {
  emptyTextByLine,
  filterComponentsByPrefix,
  getAst,
  getLastImportDecarationLine,
  isUpperCaseFirst,
} from './utils';
import type { ICompletionItem } from './types';

export function registerCompletionItem() {
  return vscode.languages.registerCompletionItemProvider(documentSelectors, {
    provideCompletionItems(document, position) {
      const lineText = document.lineAt(position).text;
      const linePrefix = lineText.substring(0, position.character).trim();

      const text = emptyTextByLine(document.getText(), position.line);
      const list = filterComponentsByPrefix(linePrefix);

      if (list.length === 0) return [];

      const completionItems = list.map(({ name, fileName }) => {
        const item = new vscode.CompletionItem(
          `${name}:primereact`,
        ) as ICompletionItem;

        item.kind = vscode.CompletionItemKind.Variable;
        item.detail = `import { ${name} } from 'primereact/${fileName}';`;
        item.sortText = name[0];

        item.data = { fileName, name };
        let insertText = '';
        if (linePrefix.startsWith('<')) {
          insertText = `${name}></${name}>`;
        } else if (linePrefix.startsWith('use')) {
          insertText = name;
        } else if (isUpperCaseFirst(linePrefix)) {
          insertText = `<${name}></${name}>`;
        }
        item.insertText = insertText;

        return item;
      });

      const ast = getAst(text);
      const lastImportLine = getLastImportDecarationLine(ast);
      let importExists = false;
      traverse(ast, {
        ImportDeclaration(path) {
          completionItems.forEach((item) => {
            const fileName = item.data.fileName;

            importExists = t.isStringLiteral(path.node.source, {
              value: `primereact/${fileName}`,
            });
            if (importExists) {
              path.stop();
              return;
            }
          });
        },
      });
      completionItems.forEach((item) => {
        const compName = (item.label as string).replace(':primereact', '');
        if (!importExists) {
          const importStatement = `import { ${compName} } from 'primereact/${item.data.fileName}';\n`;

          item.additionalTextEdits = [
            vscode.TextEdit.insert(
              new vscode.Position(lastImportLine, 0),
              importStatement,
            ),
          ];
        } else {
          item.additionalTextEdits = undefined;
        }
      });
      return completionItems;
    },
  });
}
