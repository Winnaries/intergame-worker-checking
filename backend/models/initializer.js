const mongoose = require('mongoose');
const csv = require('fast-csv');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
require('./connection');

const { Worker } = require('./schema/workforce.js');

fs.createReadStream(path.resolve(__dirname, 'assets', 'workforce-v1.csv'))
    .pipe(csv.parse({ headers: false }))
    .on('error', error => console.error(error))
    .on('data', row => {
        row[1] = _.startCase(_.toLower(row[1]));
        row[2] = _.startCase(_.toLower(row[2]));
        row[4] = _.replace(row[4], /-+/);
        row[1] = _.split(row[1], /\s+/);
        row[6] = _.split(row[6], /,\s*/);
        const worker = new Worker();
        worker.name.first = row[1][0];
        worker.name.last = row[1][1];
        worker.name.nick = row[2];
        worker.cuid = row[3];
        worker.tel = row[4];
        worker.major = row[5];
        worker.teams = row[6];
        worker.save();
    })
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));