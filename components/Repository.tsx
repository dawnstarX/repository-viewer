import React from 'react'
import { repository } from "../pages/[username]/index"
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
    repo: repository;
  };

const Repository = ({ repo }: Props) => {
  const router = useRouter();
  const handleButtonClick = () => {
    
    router.push(`${router.asPath}/${repo.name}`);
  };
    return (
      <>
        <br />
        <br />
        <><span style={{ fontWeight: 'bold' }} >{repo.name}</span>
          <span style={{ marginLeft: '10px' }}> <button onClick={handleButtonClick}>Go to Repo</button></span></>
            <p>{repo.description}</p>
            <Link href= {repo.url} target="_blank">
            Visit
        </Link>
        <br />
      </>
    
  )
}

export default Repository