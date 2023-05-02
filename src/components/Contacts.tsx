import React from 'react'
import {ContactProp} from "../../typings";

function Contacts({image, name, company, id}: ContactProp) {
    return (

        <div className={'flex items-center justify-between mt-3'}>
            <img src={image} alt={name} className={'w-10 h-10 rounded-full border p-[2px]'}/>

            <div className={'flex-1 ml-4'}>
                <h2 className={'font-semibold text-sm '}>
                    {name}
                </h2>
                <h3 className={'text-xs text-gray-400'}>
                    works at {company}
                </h3>
            </div>

            <button className={'text-xs font-bold text-blue-400 -mt-4'}>
                Follow
            </button>

        </div>

    )
}

export default Contacts
