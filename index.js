// Initialize dotEnv
require('dotenv').config()

// PhantomJS stuffs
const path = require('path')
const childProcess = require('child_process')
const phantomjs = require('phantomjs-prebuilt')
const binPath = phantomjs.path

// Node arguments parser
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const childArgs = [
    path.join(__dirname, `cases/${argv.platform}.js`),
    process.env[`${argv.platform.toUpperCase()}_URL`]
]

childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    if (err) {
        console.log(err);
    } else {
        console.log(stdout)
        console.log(stderr)
    }

})
