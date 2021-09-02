import { TableColumn } from './table-column';
import prettier from 'prettier';
import { CodeGenerator } from '../code-generator';

export class ColumnCodeGenerator implements CodeGenerator<TableColumn> {
    public generate(columns: TableColumn[]): string {
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
