const autocannon = require("autocannon");
const fs = require("fs");

// read array of items from exported .json file from postman
const collection = JSON.parse(fs.readFileSync("./customer-apis-v1.3.2.json", "UTF-8"));
const requests = collection.item;

(async function test() {
  for (const request of requests) {
    console.log(`Testing ${request.name}`);
    for (const item of request.item) {
      const result = await autocannon({
        title: item.name,
        url: item.request.url.raw,
        method: item.request.method,
      }, console.log);
      console.log(result);
    }
  }
})().catch((error) => console.log);