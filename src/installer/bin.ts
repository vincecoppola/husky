import * as execa from 'execa'
import * as fs from 'fs'
import * as isCI from 'is-ci'
import * as path from 'path'
import { install, uninstall } from './'

// Action can be "install" or "uninstall"
// huskyDir is ONLY used in dev, don't use this arguments
const [, , action, huskyDir = path.join(__dirname, '../..')] = process.argv

// Find Git dir
const { status, stdout, stderr } = execa.sync('git', ['rev-parse', '--git-dir'])
const gitDir = path.resolve(stdout) // Needed to normalize path on Windows

if (status !== 0) {
  console.log(stderr)
  !isCI && process.exit(1)
}

// Run installer
if (action === 'install') {
  install(gitDir, huskyDir, isCI)
} else {
  uninstall(gitDir, huskyDir)
}
