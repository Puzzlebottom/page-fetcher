const fs = require('fs');
const request = require('request');

const input = process.argv;
const url = input[2];
const path = input[3];


request(url, (error, response, body) => {
  if (error) return console.log(error);

  console.log(`Response Received: ${response.statusCode}`);
  writeToFile(path, body, (result) => {
    console.log(result);
  });
});

const writeToFile = (path, data, callback) => {
  fs.access(path, fs.F_OK, (err) => {
    if (err) {

      fs.writeFile(path, data, err => {
        if (err) {
          return callback(`Invalid file path: Failed to save file\n`);
        }
        return callback(`Downloaded and saved ${data.length / 1000}kb to ${path}`);
      });

    } else {

      path = [...path.split("/").slice(0, - 1), "/temp"].join("");
      callback(`A file of that name already exists.\nCreating file '${path}' and attempting write.`);
      fs.writeFile(path, data, err => {
        if (err) {
          return callback(`${err}\nFailed to save file\n`);
        }
        return callback(`Downloaded and saved ${data.length / 1000}kb to ${path}`);
      });

    }
  });
};


