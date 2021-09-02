# Fivejack / Typeorm Migration Code Generator

This CLI program helps generate code segment used in typeorm migration typescript code.
The input is MySql DDL.

## Basic dependencies

Make sure you have these installed in your computer for development

1. Node.js
2. Yarn (or npm)
3. Nodemon (`yarn global add nodemon` or `npm install -g nodemon`)

## How to Install

1. yarn build
2. npm install -g typeorm-code-generator

## How to Generate Columns Code Segment

run in git bash terminal: 'typeorm-generate column -i <input_sql_file> -o <output_file>'

## How to Generate Indices Code Segment

run in git bash terminal: 'typeorm-generate index -i <input_sql_file> -o <output_file>'
