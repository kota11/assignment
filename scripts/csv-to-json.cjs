const csv = require("csvtojson");
const fs = require("fs");

csv()
  .fromFile("spotify.csv")
  .then((json) => {
    const records = json.map((item, index) => ({
      id: index + 1,
      ...item,
    }));

    fs.writeFileSync(
      "db.json",
      JSON.stringify({ records }, null, 2)
    );

    console.log("db.json generated");
  });