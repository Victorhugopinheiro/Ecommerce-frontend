import HeroBanner from "./_components/Banner";
import Categories from "./_components/Categories";
import { HomeShowcases } from "./_components/HomeShowcases";
import GarantedServices from "./_components/GrantedServices";

export default function Home() {
  return (
    <>
      <div className="container mx-auto">
        <HeroBanner />
        <Categories />
      </div>
      <HomeShowcases />
      <div className="container mx-auto">
        <GarantedServices />
      </div>
    </>
  );
}
