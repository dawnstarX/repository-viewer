import { useSession,signOut} from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import Image from 'next/image';

const UserDetails = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const { username } = router.query;
    const user = session?.user;
    const avatar = user?.image;
    const name = user?.name;
  return (
    <div className="w-full md:w-1/4 p-4 flex flex-col items-center justify-center">
    <div className="w-1/2 md:w-full h-auto  ">
      <Image src={avatar!} alt="user avatar" width={250} height={250} className="rounded-full mb-4 md:ml-10" />
    </div>

    <h1 className="text-lg font-bold mb-1 text-white">{name}</h1>
    <p className="text-blue-600">{username}</p>

    <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:mr-4 md:mb-0 mb-2">
        <Link href={`${router.asPath}/new`}>Create new repository</Link>
      </button>

      <button
        className="hover:border-white hover:text-white border border-gray-400 text-gray-400 font-bold py-2 px-4 rounded md:ml-4"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  </div>
  )
}

export default UserDetails