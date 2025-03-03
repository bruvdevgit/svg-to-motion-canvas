#!/usr/bin/env node

const { initMain } = require("translator");

console.log('in bin.js');
(async () => {
  const main = initMain();
  await main.run();
})();
