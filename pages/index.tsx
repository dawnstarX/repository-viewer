// @ts-nocheck
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Loginbutton from "../components/login-btn"
import { useSession, signIn, signOut } from "next-auth/react";


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
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
