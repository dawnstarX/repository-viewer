import React from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { searchRepo } from '@/helper/searchRepo';
import { GetServerSidePropsContext } from "next";

const Index = ({response}) => {
  console.log(response);
  return (
    <div>
      <></>
      
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

  
  
  
  return {
      props: { response },
    };

}