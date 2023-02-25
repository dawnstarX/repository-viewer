import React from 'react'
import { GetServerSidePropsContext } from "next";
import { getSession } from 'next-auth/react';
import { repoInfo } from '@/helper/fetchdata';
import DetailsRepo from '@/components/DetailsRepo';

type RepoData = {
    RepoDetails: repo
    }
  
export type repo = {
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
    owner: {
        login: string;
            }
}
  
const index = ({ RepoDetails }:RepoData) => {
    return (
        <> <div> <DetailsRepo props={RepoDetails} />
      </div></>
     
  )
}

export default index


export async function getServerSideProps(context:GetServerSidePropsContext | undefined) {
    const session = await getSession(context);
    //@ts-ignore
    const token = session?.accessToken;
    const repo = context?.params?.repository ?? '';
    const username = context?.params?.username ?? '';
    const response = await repoInfo(username as string, token, repo as string);
    const RepoDetails = response.data.repository;
    
    return {
        props: { RepoDetails },
      };

}