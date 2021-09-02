import { TableColumn } from '../column/table-column';
import { TableIndex } from '../index/table-index';

export interface Migration {
    columns: TableColumn[];
    indices: TableIndex[];
}
