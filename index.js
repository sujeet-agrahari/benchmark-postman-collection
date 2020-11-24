const chalk = require('chalk');
const autocannon = require("autocannon");

const fs = require("fs");

const collection = JSON.parse(fs.readFileSync("./customer-apis-v1.3.2.json", "UTF-8"));
const requests = collection.item;

(async function test() {
  for (const request of requests) {
    console.log(chalk.redBright.bold(`Testing ${request.name} - directory`));
    for (const item of request.item) {
      console.log(chalk.blueBright(item.name));
      const result = await autocannon({
        title: item.name,
        url: item.request.url.raw,
        method: item.request.method,
      });
      console.log(autocannon.printResult(result));
    }
  }
})().catch((error) => console.log(error));