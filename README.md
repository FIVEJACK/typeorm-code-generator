# Fivejack / Typeorm Migration Code Generator

This CLI program helps generate code segment used in typeorm migration typescript code.
The input is MySql DDL in MySql Workbench or SQL statements in general.

## Basic dependencies

Make sure you have these installed in your computer for development

1. Node.js
2. Yarn (or npm)
3. Nodemon (`yarn global add nodemon` or `npm install -g nodemon`)

## How to Install

1. yarn build (if you clone the project and want to build locally)
2. npm install -g typeorm-code-generator

## How to Generate Migration Code

run in git bash terminal: 'typeorm-generate migration:create -i <input_sql_file> -n <migration_name>'
example: typeorm-generate migration:create -i shop.sql -n create-shop-table

You should already have database/migrations folder, and it will generate <timestamp>-create-shop-table.ts

## How to Generate Columns Code Segment

run in git bash terminal: 'typeorm-generate migration:column -i <input_sql_file> -o <output_file>'
example: typeorm-generate migration:column -i shop.sql -o columns.ts

This is for generating columns code segment only.

## How to Generate Indices Code Segment

run in git bash terminal: 'typeorm-generate migration:index -i <input_sql_file> -o <output_file>'
example: typeorm-generate migration:index -i shop.sql -o indices.ts

This is for generating indices code segment only.
