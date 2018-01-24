// 按行比较两个文件的不同
// 以行为单位, 先求得最长公共子序列
import _ from 'lodash'

const chalk = require('chalk')
const fs = require("fs")

function lcs(X, Y) {
    const xLength = X.length, yLength = Y.length, c = [], b = []
    c[-1] = new Array(yLength).fill(0)
    for (let i = 0; i < xLength; i++) {
        b[i] = []
        c[i] = []
        c[i][-1] = 0
        for (let j = 0; j < yLength; j++) {
            if (X[i] === Y[j]) {
                c[i][j] = c[i][j - 1] + 1
                b[i][j] = 0
            } else {
                //c[i][j] = Math.max(c[i - 1][j], c[i][j - 1])

                if (c[i - 1][j] > c[i][j - 1]) {
                    c[i][j] = c[i - 1][j]
                    b[i][j] = 1
                } else {
                    c[i][j] = c[i][j - 1]
                    b[i][j] = 2

                }

            }
        }
    }


    return b
}


// 打印最长公共子序列矩阵
//function printLCS(lcsArr, X, Y, i, j) {
function printLCS(lcsArr, X, Y, i, j) {

    if (i === -1 || j === -1) {
        return ''
    }
    if (lcsArr[i][j] === 0) {
        return printLCS(lcsArr, X, Y, i - 1, j - 1) + '\n' + X[i]
    } else if (lcsArr[i][j] === 1) {
        return printLCS(lcsArr, X, Y, i - 1, j)
    } else {
        return printLCS(lcsArr, X, Y, i, j - 1)
    }
}


const generateLinesPromise = function (filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, function (err, f) {
            resolve(f.toString().split('\n'))
        })
    })
}


async function lineDiff(...args) {
    const arrs = await Promise.all(_.map(args, generateLinesPromise))
    const X = arrs[0], Y = arrs[1]
    const LCS = printLCS(lcs(X, Y), X, Y, X.length - 1, X.length - 1).split('\n')
    const delSignal = '------ ', addSignal = '++++++ '
    let mStart = 0, nStart = 0, result = []
    for (let i = 0; i < LCS.length; i++) {
        for (let m = mStart; m < X.length; m++) {
            if (X[m] === LCS[i]) {
                X.slice(mStart, m).map(function (str) {
                    result.push({
                        'signal': delSignal,
                        str
                    })
                })
                mStart = m + 1
                break
            }
        }

        for (let n = nStart; n < Y.length; n++) {
            if (Y[n] === LCS[i]) {
                Y.slice(nStart, n).map(function (str) {
                    result.push({
                        'signal': addSignal,
                        str
                    })
                })
                nStart = n + 1
                break
            }
        }
        result.push({
            'signal': '',
            'str': LCS[i]
        })

    }
    if (mStart !== X.length) {
        result.push({
            'signal': delSignal,
            'str': X.slice(mStart)
        })
    }
    if (nStart !== Y.length) {
        result.push({
            'signal': addSignal,
            'str': Y.slice(nStart)
        })
    }
    return result.map(function (line) {
        //console.log(line.signal + line.str)
        if (line.signal === delSignal) {
            console.log(chalk.red(line.signal + line.str))
        } else if (line.signal === addSignal) {
            console.log(chalk.green(line.signal + line.str))
        } else {
            console.log(line.signal + line.str)
        }


    })
}

lineDiff('./a.txt', './b.txt')