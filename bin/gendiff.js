#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import process from 'process';
import calcDiff from '../src/calcDiff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    console.log(calcDiff(filepath1, filepath2, options.format));
  });

program.parse(process.argv);
