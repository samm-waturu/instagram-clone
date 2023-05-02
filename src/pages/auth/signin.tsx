import React from 'react'
import {getProviders, signIn as SignIntoProvider} from "next-auth/react";
import Header from "@/components/Header";
import Image from "next/legacy/image";
import Logo from '@/../public/ig.png'

function SignIn({providers}) {
    return (
        <>
            <Header/>

            <div className={'flex flex-col items-center justify-center min-h-screen py-2 -mt-20 px-14 text-center'}>
                <Image src={Logo} alt={'Instagram logo'} width={80} height={80}/>
                <p className={'font-xs italic font-extralight '}>
                    For Educational purposes only
                </p>
                <div className={'mt-14'}>

                    {
                        Object.values(providers || {}).map((provider) => (
                                <div key={provider.name}>
                                    <button className={'p-3 bg-blue-500 rounded-lg text-white'}
                                            onClick={() => SignIntoProvider(provider.id, {callbackUrl: '/'})}>
                                        Sign in with {provider.name}
                                    </button>
                                </div>
                            )
                        )
                    }

                </div>
            </div>

        </>
    )
}

//Middle server
export async function getServerSideProps() {
    const providers = await getProviders()
    //pass back an object which is an object with user details

    return {
        props: {
            providers
        }
    }
}

export default SignIn
