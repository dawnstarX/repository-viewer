import React from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { searchRepo } from '@/helper/searchRepo';
import { GetServerSidePropsContext } from "next";
import {filteredRepo} from "@/Types/types"
import Repository from '@/components/Repository';


const Index = ({filteredRepo}: filteredRepo) => {

  return (
    <div>
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
  const q  = context?.query?.q;
  const username = context?.params?.username ?? '';
  const response = await searchRepo(username as string, q as string, token);
  const filteredRepo = response.data.search.edges;
  return {
      props: { filteredRepo },
    };

}