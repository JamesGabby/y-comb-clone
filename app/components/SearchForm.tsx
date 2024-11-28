import Form from "next/form"
import SearchFormReset from "./SearchFormReset"

const SearchForm = () => {
  const query = "Test"

  return (
    <Form action="/" scroll={false} className="search-form">
      <input 
        type="text" 
        className="search-input" 
        name="query"
        defaultValue={query}
        placeholder="Search Startups"
      />

      <div className="flex gap-2">
        {query && <SearchFormReset />}
        <button type="submit" className="search-btn text-white">
          S
        </button>
      </div>
    </Form>
  )
}

export default SearchForm