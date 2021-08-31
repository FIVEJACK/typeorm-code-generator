import { TypeormColumn } from './interfaces';
import prettier from 'prettier';

export class ColumnCodeFormatter {
    public static format(columns: TypeormColumn[]): string {
        const jsonString = JSON.stringify(columns);
        let formattedJson = jsonString.replace(/"([^"]+)":/g, '$1:');

        return prettier.format(formattedJson, {
            tabWidth: 4,
            printWidth: 120,
            parser: 'babel',
            bracketSpacing: true,
            jsxBracketSameLine: true,
            singleQuote: true,
            trailingComma: 'all',
            semi: true,
        });
    }
}
