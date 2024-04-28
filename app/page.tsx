import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IlistingsParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import { safeListings } from "./types";

export const dynamic = 'auto'
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

interface HomeProps {
  searchParams: IlistingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const currentUser = await getCurrentUser();
  const listings = await getListings(searchParams);

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing) => (
            <ListingCard key={listing.id} currentUser={currentUser} data={listing} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;


