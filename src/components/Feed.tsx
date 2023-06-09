import React from 'react'
import Stories from "@/components/Stories";
import Posts from "@/components/Posts";
import Mini from "@/components/Mini";
import {useSession} from "next-auth/react";
import Suggest from "@/components/Suggest";

function Feed() {

    const {data: session} = useSession()

    return (

        <main className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${!session && '!grid-cols-1 !max-w-3xl'}`}>

            {/*Section - A*/}
            <section className={'col-span-2'}>

                {/*Stories*/}

                <Stories/>

                {/*Posts*/}

                <Posts />

            </section>


            {/*Section - B*/}

            {session && (
                <section className={'hidden xl:inline-grid md:col-span-1'}>

                    <div className={'fixed top-20'}>
                        {/*Main profile*/}
                        <Mini />
                        {/*Suggestions*/}
                        <Suggest />

                    </div>

                </section>
            )}



        </main>
    )
}

export default Feed
