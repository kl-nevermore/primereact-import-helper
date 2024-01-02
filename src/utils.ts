import * as parser from '@babel/parser';
import * as t from '@babel/types';
import traverse from '@babel/traverse';
import generator from '@babel/generator';
import { searchList } from './constants';

export function filterComponentsByPrefix(prefix: string) {
  prefix = prefix.replace('<', '');

  return searchList.filter((i) => i.name.startsWith(prefix));
}
export function emptyTextByLine(text: string, line: number) {
  const textSplitArr = text.split('\n');
  textSplitArr[line] = '';

  return textSplitArr.join('\n');
}
export function getAst(text: string) {
  return parser.parse(text, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });
}

export function getLastImportDecarationLine(ast: parser.ParseResult<t.File>) {
  const importDeclarationList = ast.program.body.filter(
    (i) => i.type === 'ImportDeclaration',
  );
  const lastImportDeclarationList =
    importDeclarationList[importDeclarationList.length - 1];

  return lastImportDeclarationList?.loc?.start.line ?? 0;
}

export function lowerCaseFirst(text: string) {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

export function isUpperCaseFirst(str: string) {
  var firstChar = str.charAt(0);
  return firstChar === firstChar.toUpperCase();
}

export function getImportInfoByAst(
  ast: t.Node,
  name: string,
  fileName: string,
) {
  let importExists = false;
  let activeImportLine: null | number = null;
  let appendImportStatement = '';
  traverse(ast, {
    ImportDeclaration(path) {
      const importPath = `primereact/${fileName}`;

      const specifiers = path.node.specifiers;

      if (path.node.source.value === importPath) {
        importExists = t.isStringLiteral(path.node.source, {
          value: importPath,
        });

        const target = specifiers.find(
          (specifier) => specifier.local.name !== name,
        );

        if (target) {
          activeImportLine = target.loc!.start.line;
          appendImportStatement = generator(path.node).code;
        }
      }
    },
  });
  return {
    importExists,
    activeImportLine,
    appendImportStatement,
  };
}

export function getAppendImportStatement(ast: t.Node, name: string) {
  traverse(ast, {
    ImportDeclaration(path) {
      const newSpecifier = t.importSpecifier(
        t.identifier(name),
        t.identifier(name),
      );
      path.node.specifiers.push(newSpecifier);
    },
  });

  return generator(ast).code;
}

export function createImportStatement(name: string, fileName: string) {
  return `import { ${name} } from 'primereact/${fileName}';\n`;
}
