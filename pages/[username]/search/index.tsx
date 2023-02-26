import React from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { searchRepo } from '@/helper/searchRepo';
import { GetServerSidePropsContext } from "next";
import {filteredRepo} from "@/Types/types"
import Repository from '@/components/Repository';
import FilterRepo from '@/components/FilterRepo';
import { filterRepos } from "../../../helper/filterRepo";


const Index = ({filteredRepo}: filteredRepo) => {

  return (
    <div>
      <FilterRepo />
      {
        filteredRepo.map((nodeRepo) => {
          const repo = nodeRepo.node;
          return <Repository repo={repo} key={repo.name}  />
        })
      }
      
    </div>
  )
}

export default Index;

export async function getServerSideProps(context:GetServerSidePropsContext | undefined) {
  const session = await getSession(context);
  //@ts-ignore
  const token = session?.accessToken;
  const q = context?.query?.q;
  const username = context?.params?.username ?? '';
  const language = context?.query?.language;
  const sortField = context?.query?.sortField;
  const sortOrder = context?.query?.sortOrder;
  
  var response;
  if (language || sortField || sortOrder) {
    
     response = await filterRepos(username as string, q as string, language as string, sortField as string, sortOrder as string, token);
  }
  else {
    response = await searchRepo(username as string, q as string, token);
 }
 
  
  const filteredRepo = response.data.search.edges;
  return {
      props: { filteredRepo },
    };

}