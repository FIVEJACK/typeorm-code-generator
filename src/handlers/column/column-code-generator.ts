import { TableColumn } from './table-column';
import { CodeGenerator } from '../code-generator';

export class ColumnCodeGenerator extends CodeGenerator<TableColumn> {
    public generateCode(columns: TableColumn[]): string {
        const jsonString = JSON.stringify(columns);
        return jsonString.replace(/"([^"]+)":/g, '$1:');
    }
}
