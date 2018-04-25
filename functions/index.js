const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();
const path = require('path');
const os = require('os');
const fs = require('fs');
var gs = require('gs');

exports.makePNG = functions.storage.object().onFinalize((object) => {
  const filePath = object.name;
  const fileName = path.basename(filePath);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  if (fileName.endsWith('.png')) return false;
  if (!fileName.endsWith('.pdf')) return false;

  const newName = path.basename(filePath, '.pdf') + '.png';
  const tempNewPath = path.join(os.tmpdir(), newName);

  const bucket = gcs.bucket(object.bucket);

  // Download file from bucket.
  return bucket.file(filePath).download({
    destination: tempFilePath
  }).then(() => {
    console.log('Image downloaded locally to', tempFilePath);

    return new Promise(function (resolve, reject) {
      gs()
        .batch()
        .nopause()
        .option('-r' + 50 * 2)
        .option('-dDownScaleFactor=2')
        .executablePath('lambda-ghostscript/bin/./gs')
        .device('png16m')
        .output(tempNewPath)
        .input(tempFilePath)
        .exec(function (err, stdout, stderr) {
          if (!err) {
            console.log('gs executed w/o error');
            console.log('stdout', stdout);
            console.log('stderr', stderr);
            resolve();
          } else {
            console.log('gs error:', err);
            reject(err);
          }
        });
    });
  }).then(() => {
    console.log('PNG created at', tempNewPath);

    // Uploading the thumbnail.
    return bucket.upload(tempNewPath, {destination: newName});
  // Once the thumbnail has been uploaded delete the local file to free up disk space.
  }).then(() => {
    fs.unlinkSync(tempNewPath);
    fs.unlinkSync(tempFilePath);
  }).catch((err) => {
    console.log('exception:', err);
    return err;
  });
});
