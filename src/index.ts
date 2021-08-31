#! /usr/bin/env node

import { ColumnCodeFileGenerator } from './handlers/column/column-code-file-generator';
import yargs from 'yargs';
import { IndexCodeFileGenerator } from './handlers/index/index-code-file-generator';

const argv = yargs
    .usage('\nUsage: typeorm-generate <command>')
    .command('column', 'Generate columns code', {
        input: {
            description: 'The SQL input file',
            alias: 'i',
            type: 'string',
        },
        output: {
            description: 'Generated column code file',
            alias: 'o',
            type: 'string',
        },
    })
    .command('index', 'Generate indices code', {
        input: {
            description: 'The SQL input file',
            alias: 'i',
            type: 'string',
        },
        output: {
            description: 'Generated index code file',
            alias: 'o',
            type: 'string',
        },
    })
    .help()
    .alias('help', 'h').argv as any;

if (argv._.includes('column')) {
    const columnGenerator = new ColumnCodeFileGenerator(argv.input);
    columnGenerator.generateCodeFile(argv.output);
}

if (argv._.includes('index')) {
    const indexGenerator = new IndexCodeFileGenerator(argv.input);
    indexGenerator.generateCodeFile(argv.output);
}
