// 按行比较两个文件的不同
// 以行为单位, 先求得最长公共子序列
import _ from 'lodash'

const fs = require("fs")

const generateLinesPromise = function (filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, function (err, f) {
            resolve(f.toString().split('\n'))
        })
    })
}

async function lineDiff(...args) {
    const arrs = await Promise.all(_.map(args, generateLinesPromise))

}

lineDiff('./a.txt', './b.txt')