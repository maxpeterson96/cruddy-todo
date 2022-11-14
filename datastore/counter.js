const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

//var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

// rewrite getNextUniqueId, make use of readCounter and writeCounter

exports.getNextUniqueId = (callback) => {
  // check if a counter exists, if it does, read from file and get current counter
  readCounter((err, result) => {
    // if it does not exist, write counter set to 1
      writeCounter(result + 1, (err, counterString) => {
          callback(err, counterString);
      })
  })
};

// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');




/*
if (fs.readFile('/counter.txt', 'utf8', (err, data) => {
    // if it does not exist, write counter set to 1
    if (err) {
      throw err;
      fs.writeFile('/counter.txt', 1);
      counter = 0;
    } else {
      // write a new file with counter + 1
      counter = data;
      fs.writeFile('/counter.txt', data + 1);
    }
  }))
  console.log(counter);
  return zeroPaddedNumber(counter);


  let counter = 0;
  // check if a counter exists, if it does, read from file and get current counter
  try {
    fs.readFile('/counter.txt', 'utf8', (err, data) => {
      // if it does not exist, write counter set to 1
      if (err) {
        console.error(err);
        return;
      }
      counter = data;
      fs.writeFile('/counter.txt', data + 1);
    });
  }
  catch {
    fs.writeFile('/counter.txt', 1);
    counter = 1;
  }
  console.log(counter);
  return zeroPaddedNumber(counter);
  */

