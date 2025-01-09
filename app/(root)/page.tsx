import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { fetchStartupsByQuery } from "@/lib/supabase";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const { query } = await searchParams; // Destructure the query from params
  const { data: startups, error } = await fetchStartupsByQuery(query);

  if (error) {
    console.error('Error fetching startups:', error.message, error.details);
    return <div>Error loading startups. Please try again later.</div>;
  }

  const session = await auth()
  console.log('id',session?.id);

  return (
    <>
      <section className="pink_container">
        <p className="tag">Pitch, Vote, And Grow</p>

        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {startups && startups.length > 0 ? (
            startups.map((startup) => (
              <StartupCard key={startup.id} post={startup} />
            ))
          ) : (
            <p className="no-results">No startups found.</p>
          )}
        </ul>
      </section>
    </>
  );
}
