import { RepoData } from '@/pages/[username]/[repository]';
import React from 'react'

type repoProps = {
    props:
    {
    name: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    pushedAt: string;
    isPrivate: boolean;
    url: string;
    primaryLanguage: {
        name: string;
    } | null;
    stargazers: {
        totalCount: number;
    };
    watchers: {
        totalCount: number;
    };
    forks: {
        totalCount: number;
    };
    licenseInfo: {
        name: string;
        nickname: string | null;
    } | null;
}
        
}



  
const DetailsRepo = ({props} : repoProps) => {
  return (
    <div><h1>{props.name}</h1>
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
      </div>
  )
}

export default DetailsRepo