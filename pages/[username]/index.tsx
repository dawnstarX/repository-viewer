
import { useSession, signOut,getSession} from "next-auth/react";
import { useRouter } from 'next/router';
import React, { FormEvent, useRef } from 'react'
import RootRedirect from '@/components/rootRedirect';
import { getGitHubUsername } from "@/helper/getUsername";
import {getRepo}  from "@/helper/getRepo"
import { GetServerSidePropsContext } from "next";
import Repository from "@/components/Repository";
import Link from "next/link";

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
    const router = useRouter();
  const user = session?.user;
  const name = user?.name;
  const searchTermRef = useRef<HTMLTextAreaElement>(null);

  const handleSearch = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchTerm = searchTermRef.current?.value;
    router.push({
      pathname: `${router.asPath}/search`,
      query: { q: searchTerm },
    })
    }

    if (session) {
        return (
            <>
                <h2>Welcome { name}</h2>
            <button onClick={() => signOut()}>Sign out</button>
            <Link href={`${router.asPath}/new`}><button>Create New Repo</button></Link> 
            <br />
            <br />
            <form onSubmit={(event) => { handleSearch(event)}} style={{ display: 'flex', alignItems: 'center' }}>
            <textarea
            id="name"
            name="search"
            ref={searchTermRef}
            style={{ width: '40%', marginRight: '1rem' }}
            />
        
              <button type="submit" style={{ background: 'transparent', border: 'none' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M15.708 13.292l-3.61-3.61A6.47 6.47 0 0014 6.5 6.5 6.5 0 107.5 13a6.47 6.47 0 004.182-1.528l3.61 3.61a.5.5 0 00.708-.708zM7.5 12A5.5 5.5 0 112 6.5 5.5 5.5 0 017.5 12z"/>
                </svg>
              </button>
            </form>
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

