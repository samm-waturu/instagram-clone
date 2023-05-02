import React from 'react'
import Image from "next/legacy/image";
import Logo from '../../public/ig.png'
import {
    MagnifyingGlassIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HomeIcon,
    PaperAirplaneIcon,
    HeartIcon,
    Bars3Icon,
    ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/outline";
import HeadProps from "@/components/HeadProps";
import Holder from '@/../public/default.jpg'
import {signIn, useSession, signOut} from "next-auth/react";
import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import {modalState} from "@/atoms/modalAtom";


function Header() {

    //readonly = const open = useRecoilState(modalState)

    const [open, setOpen] = useRecoilState(modalState)

    const {data: session} = useSession();

    const router = useRouter()

    // console.log(session)

    return (

        <div className={'shadow-sm border-b bg-white sticky top-0 z-50 py-2'}>
            {/*Outer div*/}

            <div className={'flex justify-between bg-white max-w-6xl mx-5 -mt-2 xl:mx-auto'}>
                {/* left */}
                <div onClick={() => router.push('/') } className={'relative hidden lg:inline-grid w-9 h-9 mt-3 cursor-pointer'}>

                    <Image src={Logo} alt={'papa image'}
                           layout={'fill'} objectFit={'contain'}/>

                </div>

                <div className={'relative mt-3 w-9 h-9 lg:hidden flex-shrink-0'}>

                    <Image src='https://links.papareact.com/jjm' layout={'fill'} objectFit={'contain'}/>

                </div>


                {/* middle search input field */}

                <div className={'max-w-xs ml-64'}>

                    <div className={'relative mt-1 p-3 rounded-md'}>
                        {/*
                         <div className={'inset-y-0 pl-3 flex items-center pointer-events-none'}>
                            <MagnifyingGlassIcon className={'h-5 w-5 absolute top-5 text-gray-500'}/>
                        </div>
                        <input
                            className={'bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black'}
                            type={'text'} placeholder={'Search'}/>
                        */}
                    </div>

                </div>

                {/* right */}

                {
                    session ? (
                        <div className={'mt-2 flex items-center justify-end space-x-4'}>
                            <HeadProps Icon={HomeIcon}/>
                            <HeadProps Icon={PaperAirplaneIcon} className={'-rotate-45'} notify={6} active={true} activeClass={'right-[-4px]'}/>
                            <Bars3Icon className={'h-6 md:hidden'}/>
                            <div className={'mt-2'}  onClick={() => {
                                setOpen(true)
                            }}>
                                <HeadProps Icon={PlusCircleIcon}/>
                            </div>
                            <HeadProps Icon={UserGroupIcon}/>
                            <HeadProps Icon={HeartIcon} active={true} notify={2}
                                       activeClass={'right-[-4px]'}/>
                            <button className={'border-2 h-10 w-[95px] mb-1 rounded-md bg-blue-400 text-xs text-white'}
                                    onClick={() => signOut()}>SignOut
                            </button>
                            {/*<HeadProps Icon={ArrowLeftOnRectangleIcon} onClick={() => signOut()}  className={'h-6'}/>*/}
                            <div className={'h-10 w-10 cursor-pointer mb-1'}>
                                <Image src={session ? session.user?.image : Holder}
                                       alt={'User Image'}
                                       width={40} height={40}
                                       objectFit={'contain'}
                                       className={'rounded-full'}/>

                            </div>

                        </div>
                    ) : (
                        <div className={'mt-2 flex items-center justify-end space-x-4'}>
                            <div onClick={() => router.push('/')}>
                            <HeadProps Icon={HomeIcon}/>
                            </div>
                            <button
                                className={'border-2 h-10 w-[95px] -mt-[5px] rounded-md bg-blue-400 text-xs text-white -mt-0.5'}
                                onClick={() => signIn()}>Sign in
                            </button>
                        </div>
                    )
                }


            </div>
        </div>

    )
}

export default Header
