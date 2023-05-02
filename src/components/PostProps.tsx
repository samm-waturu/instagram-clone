import React from 'react'
import {PostProps} from "../../typings";

function PostProps({Icon, custom}: PostProps) {
    return (
       <>
           {Icon && <Icon className={`h-7 hover:scale-125 cursor-pointer transition-all duration-200 ease-out  ${custom}`}/>}
        </>
    )
}

export default PostProps
