import React from 'react'
import { repoProps } from '@/Types/types';
import Link from 'next/link';
import { useRouter } from 'next/router';



const Repository = ({ repo }: repoProps) => {
  const router = useRouter();
  const visibility = repo.isPrivate ? "PRIVATE" : "PUBLIC";
  const handleButtonClick = () => {
    const pathWithoutQuery = router.asPath.split("?")[0];
  const pathWithoutSearch = pathWithoutQuery.replace(/\/search$/, "");
  const newPath = `${pathWithoutSearch}/${repo.name}`;

  if (router.asPath !== pathWithoutQuery) {
    router.push(newPath);
  } else {
    router.push(newPath);
  }
  };

    return (
      <>
     <div className="border border-gray-400 rounded-lg shadow-md p-4 flex flex-col justify-between bg-transparent">
  <div className="flex justify-between mb-2">
    <h2 className="text-lg font-bold text-blue-500" style={{marginBottom: '10px'}}>{repo.name}</h2>
            <div className="border border-white rounded-lg py-1 px-2 text-xs text-white flex items-center" style={{padding: '4px'}} >
      {visibility}
    </div>
  </div>
  <p className="text-white mb-4" style={{marginTop: '10px', marginBottom: '20px'}}>{repo.description}</p>
  <div className="flex justify-between items-end" style={{marginTop: '20px'}}>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleButtonClick}>
      More Info
    </button>
    <button className="bg-transparent hover:bg-gray-400 text-white font-bold py-2 px-4 rounded border border-white" >
      <Link href= {repo.url} target="_blank">
        Go to Repo
      </Link>
    </button>
  </div>
</div>



      </>
    
  )
}

export default Repository