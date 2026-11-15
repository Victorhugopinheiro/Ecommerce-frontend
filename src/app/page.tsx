import HeroBanner from "./_components/Banner";
import Categories from "./_components/Categories";
import GtaSpotlight from "./_components/GtaSpotlight";
import GarantedServices from "./_components/GrantedServices";
import LastestsCollections from "./_components/LatestCollections";
import BrandsCollections from "./_components/BrandsCollections";

export default function Home() {
  return (
    <>
      <div className="container mx-auto">
        <HeroBanner />
        <Categories />
        <LastestsCollections />
      </div>
      <GtaSpotlight />
      <div className="container mx-auto">

        <BrandsCollections brand={{title: "MARCAS", subtitle: "POPULARES", banner: "/bannerGta.jpg", description: "Descubra as novidades da estação, com peças modernas, confortáveis e prontas para renovar o seu visual.", products: []}} />
        
        <GarantedServices />
      </div>
    </>
  );
}
