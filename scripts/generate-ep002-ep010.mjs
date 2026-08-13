import { writeEpisode } from "./fh-factory-lib.mjs";
import { episodes002to004 } from "./episodes-002-004.mjs";
import { episodes005to007 } from "./episodes-005-007.mjs";
import { episodes008to010 } from "./episodes-008-010.mjs";

const all = [...episodes002to004, ...episodes005to007, ...episodes008to010];

let total = 0;
for (const ep of all) {
  const written = writeEpisode(ep);
  total += written.length;
  console.log(`${ep.id}: ${written.length} files → ${ep.title}`);
}
console.log(`DONE: ${all.length} episodes, ${total} files`);
