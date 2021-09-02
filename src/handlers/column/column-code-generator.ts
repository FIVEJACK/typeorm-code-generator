import prettier from 'prettier';
import { TableColumn } from './table-column';
import { CodeGenerator } from '../code-generator';
import { formatConfig } from '../../config/format';

export class ColumnCodeGenerator implements CodeGenerator<TableColumn> {
    public generateCode(columns: TableColumn[]): string {
        const jsonString = JSON.stringify(columns);
        return jsonString.replace(/"([^"]+)":/g, '$1:');
    }

    public generateFormatedCode(columns: TableColumn[]): string {
        const code = this.generateCode(columns);
        return prettier.format(code, formatConfig);
    }
}
