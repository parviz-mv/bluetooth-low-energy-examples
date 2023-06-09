const noble = require("@abandonware/noble");

noble.on("stateChange", function (state) {
  if (state === "poweredOn") {
    noble.startScanning([], false);
  } else {
    noble.stopScanning();
  }
});

noble.on("discover", function (peripheral) {
  if (peripheral.advertisement.localName) {
    console.log(`${new Date()}`);
    console.log(
      `Peripheral discovered (${peripheral.id} with address <${peripheral.address}, ${peripheral.addressType}>, connectable: ${peripheral.connectable}, scannable: ${peripheral.scannable}, RSSI ${peripheral.rssi}:`
    );
    console.log(`\tDevice local name: ${peripheral.advertisement.localName}`);
    console.log(
      `\tDevice service uuids: ${JSON.stringify(peripheral.advertisement.serviceUuids)}`
    );
    const serviceData = peripheral.advertisement.serviceData;

    if (serviceData && serviceData.length) {
      console.log("\there is my service data:");
      for (const i in serviceData) {
        console.log(
          `\t\t${JSON.stringify(serviceData[i].uuid)}: ${JSON.stringify(
            serviceData[i].data.toString("hex")
          )}`
        );
      }
    }

    if (peripheral.advertisement.manufacturerData) {
      console.log("\tDevice manufacturer data:");
      console.log(
        `\t\t${JSON.stringify(
          peripheral.advertisement.manufacturerData.toString("hex")
        )}`
      );
    }

    if (peripheral.advertisement.txPowerLevel !== undefined) {
      console.log("\tDevice TX power level is:");
      console.log(`\t\t${peripheral.advertisement.txPowerLevel}`);
    }

    console.log();
  }
});

process.on("SIGINT", function () {
  console.log("Caught interrupt signal");
  noble.stopScanning(() => process.exit());
});

process.on("SIGQUIT", function () {
  console.log("Caught interrupt signal");
  noble.stopScanning(() => process.exit());
});

process.on("SIGTERM", function () {
  console.log("Caught interrupt signal");
  noble.stopScanning(() => process.exit());
});
