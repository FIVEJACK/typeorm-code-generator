import { TypeormColumn } from './interfaces';

export class ColumnCodeFormatter {
    public static format(columns: TypeormColumn[]): string {
        const jsonString = JSON.stringify(columns);
        return jsonString.replace(/"([^"]+)":/g, '$1:');
    }
}
