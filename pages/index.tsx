// @ts-nocheck
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import AccessToken from "../components/accessToken"
import { useSession, signIn, signOut } from "next-auth/react";



const inter = Inter({ subsets: ['latin'] })

export default  function Home () {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <AccessToken />
        
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>

    </>
  );
  
}
