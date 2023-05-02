import React from 'react'
import {signOut, useSession} from "next-auth/react";
import Image from "next/legacy/image";

function Mini() {
    const {data:session} = useSession()

    // console.log(session)

    return (

        <div className={'flex items-center justify-center mt-14 ml-14 '}>
            <div className={'rounded-full border p-[2px] w-14 h-14'}>
                <Image src={session?.user?.image} alt="User image"
                       width={60} height={60} className={'rounded-full'} />
            </div>
            <div className={'flex-1 mx-4'}>
                <h2 className={'font-bold'}>
                    {session?.user?.username}
                </h2>
                <h4 className={'text-xs text-gray-400'}>Welcome to IG</h4>
            </div>

            <button onClick={() => signOut()} className={'ml-10 text-blue-400 text-xs'}>
                Sign out
            </button>
        </div>
    )
}

export default Mini
