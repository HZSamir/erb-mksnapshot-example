'use strict';

const path = require('path');
const glob = require('glob');
const fs = require('fs');

exports.default = (context) => {
  const APP_NAME = context.packager.appInfo.productFilename;
  const APP_OUT_DIR = context.appOutDir;

  const _promises = [];

  const v8ContextFileName = getV8ContextFileName();
  const pathToBlob = path.resolve(
    context.outDir,
    '..',
    '..',
    'snapshot_blob.bin'
  );
  const pathToBlobV8 = path.resolve(
    context.outDir,
    '..',
    '..',
    v8ContextFileName
  );

  console.log('context.outDir', context.outDir);
  console.log('pathToBlob', pathToBlob);

  // Copy generated snapshots
  _promises.push(
    fs.copyFile(
      pathToBlob,
      path.resolve(APP_OUT_DIR, 'snapshot_blob.bin'),
      (err) => {
        if (err) throw err;
        console.log('snapshot_blob.bin was copied successfully');
      }
    )
  );
  _promises.push(
    fs.copyFile(
      pathToBlobV8,
      path.resolve(APP_OUT_DIR, v8ContextFileName),
      (err) => {
        if (err) throw err;
        console.log('v8_context_snapshot.bin was copied successfully');
      }
    )
  );

  return Promise.all(_promises);
};

function getV8ContextFileName() {
  if (process.platform === 'darwin') {
    return `v8_context_snapshot${
      process.arch.startsWith('arm') ? '.arm64' : '.x86_64'
    }.bin`;
  } else {
    return `v8_context_snapshot.bin`;
  }
}
