import { getBlog } from "@/actions/blog";
import { getDestinasi } from "@/actions/destinasi";
import LandingPage from "@/components/landing/landing-page";
import { currentUser } from "@/lib/authenticate";

export default async function Home() {
  const destinasiData = await getDestinasi();
  const blogData = await getBlog();
  const user = await currentUser();
  return (
    <LandingPage
      destinasiData={destinasiData}
      blogData={blogData}
      user={user}
    />
  );
}
