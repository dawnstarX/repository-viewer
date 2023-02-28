import { useSession,getSession} from "next-auth/react";
import { useRouter } from 'next/router';
import RootRedirect from '@/components/rootRedirect';
import {getRepo}  from "@/helper/getRepo"
import { GetServerSidePropsContext } from "next";
import Repository from "@/components/Repository";
import { repositories } from "@/Types/types";
import SearchRepo from "@/components/SearchRepo";
import UserDetails from "@/components/UserDetails";




const Index = (repositories : repositories) => {
  const { data: session } = useSession();
  const router = useRouter();

    if (session) {
        return (
            <>
            <div className="flex flex-row h-screen">
              <UserDetails />
  
  <div className="w-3/4 p-4">
    <SearchRepo />
    <div className="grid grid-cols-2 gap-4">
      {repositories.repositories.map((repo) => {
        return <Repository repo={repo} key={repo.name} />;
      })}
    </div>
  </div>
</div>
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

