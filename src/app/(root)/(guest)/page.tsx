import { getBlog } from "@/actions/blog";
import { getDestinasi } from "@/actions/destinasi";
import LandingPage from "@/components/landing/landing-page";

export default async function Home() {
  const destinasiData = await getDestinasi();
  const blogData = await getBlog();
  return <LandingPage destinasiData={destinasiData} blogData={blogData} />;
}
