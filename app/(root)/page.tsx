import Image from "next/image";
import SearchForm from "../components/SearchForm";

export default function Home() {
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

        <SearchForm />
      </section>
      
    </>
  );
}
