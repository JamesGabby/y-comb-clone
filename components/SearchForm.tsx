import Form from "next/form"
import SearchFormReset from "./SearchFormReset"
import { Search } from "lucide-react"

const SearchForm = ({ query }: { query?: string }) => {
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
        {query && <SearchFormReset /> /* If there's a query then show the component */}
        <button type="submit" className="search-btn text-white">
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  )
}

export default SearchForm