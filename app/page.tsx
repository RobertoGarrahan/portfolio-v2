import { PortfolioPage } from "@/components/portfolio-page";
import { getPortfolioData } from "@/sanity/lib/fetch";

export const revalidate = 60;

export default async function Home() {
  const data = await getPortfolioData();
  return <PortfolioPage data={data} />;
}
