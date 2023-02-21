import React from 'react'
import { useSession,signIn,signOut } from 'next-auth/react'

const Login = () => {
    const { data: session } = useSession();
    const user = session?.user;
    const name = user?.name;
    const email = user?.email;
    if (session) {
        return (
          <>
                Signed in as {name} <br />
               
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )
      }
      return (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )
}

export default Login