import * as parser from '@babel/parser';
import * as t from '@babel/types';
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
