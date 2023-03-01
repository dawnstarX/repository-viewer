import React, { FormEvent, useRef } from 'react'
//import { FilterOptions } from '@/Types/types';
import router from 'next/router';

export type FilterOptions= {
  language?: string;
  sortField?: string;
  sortOrder?: string
}

const FilterRepo = () => {

  const languageRef = useRef<HTMLSelectElement>(null);
  const sortFieldRef = useRef<HTMLSelectElement>(null);
  const sortOrderRef = useRef<HTMLSelectElement>(null);
  
  function handleSubmit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const queryParams = {
      language: languageRef.current?.value?.toString() ?? null,
      sortField: sortFieldRef.current?.value?.toString() ?? null,
      sortOrder: sortOrderRef.current?.value?.toString() ?? null,
    };

    router.push({
      
      query: {
        ...router.query,
        ...queryParams,
      },
    });
  }

  return (
    <div className="h-60 flex flex-col justify-center items-center">
    <h1 className="text-4xl text-white mt-2 mb-4">Filters:</h1>
    <form className="flex flex-col sm:flex-row justify-between text-white items-center" onSubmit={(event) => { handleSubmit(event) }}>
      <div className="flex flex-col sm:flex-row mb-2 sm:mb-0 w-full sm:w-auto">
        <label className="flex items-center mb-2 ml-2">
          Language:
          <select name="language" ref={languageRef} className="ml-4 mr-4 bg-transparent border border-white rounded-md p-1 mx-2" >
            <option value="any">Any</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
        </label>
        <label className="flex text-white items-center mb-2 ml-2">
          Sort by:
          <select name="sortField" ref={sortFieldRef} className="ml-4 mr-4 bg-transparent border border-white rounded-md p-1 mx-2">
            <option value="none">None</option>
            <option value="name">Name</option>
            <option value="created_at">Date created</option>
            <option value="updated_at">Date updated</option>
          </select>
        </label>
        <label className="flex text-white bg-transparent items-center mb-2 ml-2">
          Order: 
          <select name="sortOrder" ref={sortOrderRef} className="ml-4 mr-4 bg-transparent border border-white rounded-md p-1 mx-2">
            <option value="none">None</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <button type="submit" className="py-2 px-5 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75  mb-5 sm:mt-0 mt-5 w-full sm:w-auto">Apply Filters</button>
    </form>
  </div>
  
  
  )
}

export default FilterRepo; 