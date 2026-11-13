import HeroBanner from "./_components/Banner";
import Categories from "./_components/Categories";
import LastestsCollections from "./_components/LatestCollections";

export default function Home() {
  return (
    <div>
      <HeroBanner/>
      <Categories/>
      <LastestsCollections/>
    </div>
  );
}
