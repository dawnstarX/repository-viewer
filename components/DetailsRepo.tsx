import { repo } from '@/pages/[username]/[repository]';
import { deleteRepo } from '@/helper/fetchdata';
import React from 'react'
import { useSession } from 'next-auth/react';

type repoProps = {
    props:repo
    }



  
const DetailsRepo = ({ props }: repoProps) => {

  const { data: session } = useSession();
    //@ts-ignore
  const token = session?.accessToken;
  const username = props.owner.login;

  function handleClick() {
    deleteRepo(username,props.name,token).then(() => {
      console.log('Repository deleted successfully!');
    })
    .catch(error => {
      console.error('Failed to delete repository:', error);
    });
  }
  
  return (
    <div><h1>{props.name}</h1>
      <p>{props.owner.login}</p>
    <p>{props.description}</p>
    <p>{props.createdAt}</p>
    <p>{props.updatedAt}</p>
    <p>{props.pushedAt}</p>
    <p>{props.isPrivate ? 'Private' : 'Public'}</p>
    <p>{props.url}</p>
    <p>{props.primaryLanguage?.name}</p>
    <p>{props.stargazers.totalCount}</p>
    <p>{props.watchers.totalCount}</p>
    <p>{props.forks.totalCount}</p>
    <p>{props.licenseInfo?.name}</p>
      <p>{props.licenseInfo?.nickname}</p>
      
      <button>update</button>
      <button onClick={handleClick}>delete</button>
      </div>
  )
}

export default DetailsRepo