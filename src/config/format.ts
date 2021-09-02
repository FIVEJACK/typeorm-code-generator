import prettier from 'prettier';

export const formatConfig: prettier.Options = {
    tabWidth: 4,
    printWidth: 120,
    parser: 'typescript',
    bracketSpacing: true,
    jsxBracketSameLine: true,
    singleQuote: true,
    trailingComma: 'all',
    semi: true,
};
