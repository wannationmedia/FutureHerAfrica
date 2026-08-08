import { writeProduct } from "./fh-product-lib.mjs";
import { products001to005 } from "./products-001-005.mjs";
import { products006to010 } from "./products-006-010.mjs";

const all = [...products001to005, ...products006to010];

let total = 0;
for (const product of all) {
  const written = await writeProduct(product);
  total += written.length;
  console.log(`${product.epId}: ${product.type} · ${product.name} → ${written.length} files`);
}
console.log(`DONE: ${all.length} products, ${total} files`);
