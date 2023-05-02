import React, {useEffect, useState} from 'react'
import Story from "@/components/Story";
import FakerFields from "@/components/FakerFields";
import {useSession} from "next-auth/react";

function Stories() {

    const [users, setUsers] = useState([])

    const {data: session} = useSession()


    useEffect(() => {
        let profiles = [];
        Array.from({length: 18}).forEach(() => {
            profiles.push(FakerFields())
        })

        {profiles && setUsers(profiles)}

        // console.log(users)

    }, [])

    return (

        <div className={'flex space-x-2 p-6 bg-white mt-8 border-gray-200 rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400'}>
            {session && (<Story img={session?.user?.image} username={session?.user?.name || 'no userName'}/>)}
            {users.map(profile => (
                    <Story key={profile.userId} img={profile.avatar} username={profile.username}/>
                )
            )}

        </div>
    )
}

export default Stories
