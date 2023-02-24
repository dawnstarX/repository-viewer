
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/router';
import React from 'react'
import RootRedirect from '@/components/rootRedirect';




const Index = () => {
    const { data: session } = useSession();
    if (session) {
        return (
            <>
                <p>welcome</p>
                <button onClick={() => signOut()}>Sign out</button>
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