import Mocha from 'mocha';
import fs from 'fs';
import path from 'path';
import Reporter from 'mocha-simple-html-reporter';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mocha = new Mocha({
  reporter: Reporter,
  reporterOptions: {
    output: 'reports/test-report.html',
  },
});

fs.readdirSync(path.join(__dirname, 'test'))
  .filter((file) => file.endsWith('.js'))
  .forEach((file) => {
    mocha.addFile(path.join(__dirname, 'test', file));
  });

mocha.run((failures) => {
  process.exitCode = failures ? 1 : 0;
});

