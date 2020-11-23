const autocannon = require("autocannon");
const fs = require("fs");

// read array of items from exported .json file from postman
const collection = JSON.parse(fs.readFileSync("./customer-apis-v1.3.2.json", "UTF-8"));
const requests = collection.item;

(async function test() {
  for (const request of requests) {
    // test request using autocannon, pass the method, body, etc. on the autocannon options
    // you might need to manipulate your data in item so you can pass it to autocannon
    console.log(`Testing ${request.name}`);
    for (const item of request.item) {
      const result = await autocannon({
        title: item.name,
        url: item.request.url.raw,
        method: item.request.method,
      });
      console.log(result);
    }
  }
})().catch((error) => console.log);