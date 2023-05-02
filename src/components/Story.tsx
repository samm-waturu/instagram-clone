import React from 'react'
import {StoryProp} from "../../typings";
import Image from "next/legacy/image";

function Story({img, username}: StoryProp) {
    return (
        <div>
            <div className={'border-red-500 border-2 h-12 w-12 cursor-pointer hover:scale-110 flex justify-center items-center rounded-full transition-transform duration-200 ease-out'}>
                <Image src={img} alt={username} objectFit={'contain'} height={42} width={42}
                       className={'rounded-full p-[2px]'}/>
            </div>

            <p className={'text-xs w-14 truncate'}>{username}</p>

        </div>
    )
}

export default Story
