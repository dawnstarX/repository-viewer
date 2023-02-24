
import { useSession, signOut,getSession} from "next-auth/react";
import { useRouter } from 'next/router';
import React from 'react'
import RootRedirect from '@/components/rootRedirect';
import { getGitHubUsername, getRepo } from "@/helper/fetchdata";
import { GetServerSidePropsContext } from "next";
import Repository from "@/components/Repository";

type repositories={
    repositories:repository[]
}
export type repository={
    name: string,
    description: string,
    url:string
}



const Index = (repositories : repositories) => {
    const { data: session } = useSession();
    const user = session?.user
    const name=user?.name
    if (session) {
        return (
            <>
                <h2>Welcome { name}</h2>
                <button onClick={() => signOut()}>Sign out</button>
                
                {
                    repositories.repositories.map((repo) => {
                        return <Repository repo={repo} key={repo.name}  />
                   })
                }
          </>
        );
      }
      return (
        <>
          <RootRedirect />
    
        </>
      );
}

export default Index

export async function getServerSideProps(context: GetServerSidePropsContext | undefined) {
    const session = await getSession(context);
    
    if (!session) {
            return {
              redirect: {
                destination: '/',
                permanent: false,
              },
            };
          }
    //@ts-ignore
    const token = session.accessToken;
    const username = context?.params?.username ?? '';
    const repoResponse = await getRepo(username as string, token);
    const repositories = repoResponse.data.user.repositories.nodes;

    return {
        props: { repositories },
      };
    
    
} 

