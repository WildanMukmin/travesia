import { getDestinasi } from "@/actions/destinasi";
import LandingPage from "@/components/landing/landing-page";

export default async function Home() {
  const destinasiData = await getDestinasi();
  if (Array.isArray(destinasiData)) {
    return <LandingPage destinasi={destinasiData} />;
  }
  return null;
}
