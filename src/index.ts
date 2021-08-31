#! /usr/bin/env node

import { ColumnCodeGenerator } from './handlers/column/column-code-generator';
import yargs from 'yargs';
import { IndexCodeGenerator } from './handlers/index/index-code-generator';

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
    const columnGenerator = new ColumnCodeGenerator(argv.input);
    columnGenerator.generateCodeFile(argv.output);
}

if (argv._.includes('index')) {
    const indexGenerator = new IndexCodeGenerator(argv.input);
    indexGenerator.generateCodeFile(argv.output);
}
