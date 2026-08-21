import { EditorialHome } from "@/components/home/EditorialHome";
import { getPublicCatalog } from "@/lib/content";

export const revalidate = 60;

export default async function HomePage() {
  const catalog = await getPublicCatalog();
  return <EditorialHome catalog={catalog} />;
}
