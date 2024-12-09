import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { supabase } from "@/lib/supabase"

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query

  const { data: startups, error } = await supabase
    .from('startups')
    .select(`
      id,
      title,
      createdat,
      views,
      description,
      category,
      image,
      pitch,
      authors (id, name) -- Fetch id and name from the authors table
    `);

  if (error) {
    console.error('Error fetching startups:', error);
    return <div>Error loading startups.</div>;
  }

  return (
    <>
      <section className="pink_container">
        <p className="tag">Pitch, Vote, And Grow</p>
        
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, 
          and Get Noticed in Virtual Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"`: "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {startups ? (
            startups?.map((startup: StartupCardType) => (
              <StartupCard key={startup?.id} post={startup} />
            ))
          ) : (
            <p className="no-results">
              No startups found.
            </p>
          )}
        </ul>
      </section>
    </>
  );
}
