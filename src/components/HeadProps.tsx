import React from 'react'
import {HeadTypings} from "../../typings";

function HeadProps({Icon, active, className, onClick, notify, activeClass}: HeadTypings) {
    return (
        <div className={'relative navBtn'}>
            {Icon && <Icon className={`${className}`} />}
            {active && (<span className={`${activeClass} absolute text-xs bg-red-300 w-[16px] h-[16px] flex items-center justify-center rounded-full -top-1 animate-pulse text-white z-50`}>{notify}</span> )}
        </div>

    )
}

export default HeadProps
