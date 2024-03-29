'use strict'

const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')
const webpack = require('webpack')

module.exports = function build(webpackConfig, namesapce, distPath) {
    const spinner = ora(
      'building for ' + namesapce
    )
    spinner.start()
    
    rm(distPath, err => {
        if (err) throw err
        webpack(webpackConfig, (err, stats) => {
            spinner.stop()
            if (err) throw err
            process.stdout.write(
                stats.toString({
                    colors: true,
                    modules: false,
                    children: false,
                    chunks: false,
                    chunkModules: false
                }) + '\n\n'
            )
    
            if (stats.hasErrors()) {
                console.log(chalk.red(' Build failed with errors.\n'))
                process.exit(1)
            }
    
            console.log(chalk.cyan(' Build complete.\n'))
        })
    })
}
