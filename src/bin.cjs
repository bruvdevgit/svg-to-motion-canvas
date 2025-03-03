#!/usr/bin/env node

import { initMain } from "translator";

console.log('in bin.js');
(async () => {
  const main = initMain();
  await main.run();
})();
