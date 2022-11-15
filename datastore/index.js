const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    fs.writeFile(`${exports.dataDir}/${id}.txt`, text, (err) => {
      callback(null, { id, text });
    });
  });
};

exports.readAll = (callback) => {
  let arr = [];
  fs.readdir(exports.dataDir, (err, files) => {
    files.map((file) => {
      let id = file.split('.')[0];
      arr.push({ id, 'text': id });
    })
    callback(null, arr);
  });
};

exports.readOne = (id, callback) => {
  fs.readFile(`${exports.dataDir}/${id}.txt`, 'utf8', (err, text) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null, { id, text });
    }
  });
};

exports.update = (id, text, callback) => {
  fs.access(`${exports.dataDir}/${id}.txt`, (error) => {
    if (error) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      fs.writeFile(`${exports.dataDir}/${id}.txt`, text,  (err) => {
        callback(null, { id, text });
      });
    }
  })

  // fs.readFile(`${exports.dataDir}/${id}.txt`, 'utf8', (err, text) => {
  //   if (err) {
  //     callback(new Error(`No item with id: ${id}`));
  //   } else {
  //     callback(null, { id, text });
  //   }
  // });
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
};

exports.delete = (id, callback) => {
  fs.unlink(`${exports.dataDir}/${id}.txt`, callback)
  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
