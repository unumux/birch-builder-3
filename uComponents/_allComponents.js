// using older js modules for the sake of plain node
var fs = require("fs");

let c090 = require('./c090')
let c100 = require('./c100')
let c101 = require('./c101')
let c102 = require('./c102')
let c104 = require('./c104')
let c154s = require('./c154s')
let sub1 = require('./sub1')
let sub2 = require('./sub2')
let sub3 = require('./sub3')

// don't forget to also add them to the combo destructuring statement:
let combo = { ...c090, ...c100, ...c101, ...c102, ...c104, ...c154s, ...sub1, ...sub2, ...sub3 };


let comboString = `let megaComponentObject = ${JSON.stringify(combo)}`
fs.writeFileSync("./dist/generatedFiles/megaComponentObject.js", comboString)

module.exports = 'complete';