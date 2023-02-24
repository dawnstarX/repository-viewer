// @ts-nocheck
import Head from 'next/head'


import RedirectUser from '@/components/RedirectUser';
import { useSession, signIn } from "next-auth/react";





export default  function Home () {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <RedirectUser />
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
