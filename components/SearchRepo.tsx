
import { useRouter } from 'next/router';
import React, { FormEvent, useRef } from 'react'

const SearchRepo = () => {

    const router = useRouter();
  const searchTermRef = useRef<HTMLTextAreaElement>(null);
    const handleSearch = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      const searchTerm = searchTermRef.current?.value;
      const queryParams = {
        q:searchTerm,
        language:  "any",
        sortField:  "name",
        sortOrder:  "asc",
      };
        router.push({
          pathname: `${router.asPath}/search`,
          query: queryParams,
        })
        }
    

  return (
    <div>
  <form onSubmit={(event) => { handleSearch(event) }} className="relative">
    <textarea
      id="name"
      name="search"
      ref={searchTermRef}
      placeholder="Search repositories"
      className="border border-gray-400 px-4 py-2 mb-4 w-full bg-transparent rounded-lg placeholder-white placeholder-opacity-75 text-white  h-16 flex items-center"
      style={{resize: "none"}} />
          
          <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  font-bold px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    
  </form>
</div>

  )
}

export default SearchRepo