import Carousal from "../components/Carousal";
import MidSeason from "../components/MidSeason";
import BestSelling from "../components/BestSelling";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <Carousal />
      <MidSeason />
      <BestSelling />
    </Layout>
  );
}
