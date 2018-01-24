// 按行比较两个文件的不同
// 以行为单位, 先求得最长公共子序列


var lineReader0 = require('readline').createInterface({
  input: require('fs').createReadStream('./a.txt')
})
var lineReader1 = require('readline').createInterface({
  input: require('fs').createReadStream('./b.txt')
})
lineReader0.on('line', function (line) {
  console.log('Line from file:', line);
})

