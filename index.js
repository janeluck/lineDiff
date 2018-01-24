// 按行比较两个文件的不同
// 以行为单位, 先求得最长公共子序列

/*

const lineReader0 = require('readline').createInterface({
        input: require('fs').createReadStream('./a.txt')
    }),
    lineReader1 = require('readline').createInterface({
        input: require('fs').createReadStream('./b.txt')
    }), lineArr0 = [], lineArr1 = []

lineReader0.on('line', function (line) {
    //console.log('Line from file:', line);
    lineArr0.push(line)
})
lineReader1.on('line', function (line) {
    //console.log('Line from file:', line);
    lineArr1.push(line)
})

const  generateLines = function (filePath) {
    const lineArr = []
    require('readline').createInterface({
        input: require('fs').createReadStream(filePath)
    }).on('line', function (line) {
        lineArr.push(line)
    })

    return lineArr
}

console.log(generateLines('./a.txt'))*/
var fs = require("fs")
let result
fs.readFile('./a.txt', function (err, f) {
    result = f.toString().split('\n');
    console.log(result)
    // use the array
})
const generateLinesPromise = function (filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, function (err, f) {
            resolve(f.toString().split('\n'))
        })
    })
}

async function lineDiff(file0, file1) {
    const arrs = await Promise.all([generateLinesPromise(file0), generateLinesPromise(file1)])

    console.log(...arrs)

}

lineDiff('./a.txt', './b.txt')