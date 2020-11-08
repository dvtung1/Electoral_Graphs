const router = require("express").Router();
const fs = require("fs");
const readline = require("readline")

router.get("/power", async (req, res) => {
    const file = readline.createInterface({
        input: fs.createReadStream("./graphing_data_aref/state_data"),
        output: process.stdout,
        terminal: false
    })
    let isFirstLine = true;
    let hashTable = {};
    let hashTableOtherInfo = {};
    for await (const line of file) {
        if (isFirstLine) {
            isFirstLine = false;
            continue;
        }
        const splittedArr = line.split(",");
        const state = splittedArr[0];
        const ecVote = splittedArr[1];
        const population = splittedArr[3];
        const nhwPercent = splittedArr[4];
        hashTable[state] = ecVote / population * 100;
        hashTableOtherInfo[state] = [ecVote, population, nhwPercent];
    }
  
    return res.status(200).json({
        result: hashTable,
        otherInfo: hashTableOtherInfo
    })

})

module.exports = router;