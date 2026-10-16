import { runSeed } from "./seed";
import { pool } from "./index";

runSeed()
  .then(() => {
    console.log("Seed completed!");
    return pool.end();
  })
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
