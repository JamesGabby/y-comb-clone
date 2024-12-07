import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query

  const posts = [{
    _createdAt: new Date(),
    views: 55,
    author: { _id: 1, name: 'James' },
    _id: 1,
    description: 'no desc',
    image: 'https://platform.polygon.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25552747/WoW_Remix_MOP_Key_Art.jpg?quality=90&strip=all&crop=7.8125%2C0%2C84.375%2C100&w=1080',
    category: 'gaming',
    title: 'WoW monster'
  }]

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
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">
              No startups found.
            </p>
          )

          }
        </ul>
      </section>
    </>
  );
}
