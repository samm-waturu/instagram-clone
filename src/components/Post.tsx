import React, {useEffect, useState} from 'react'
import {FakerProp} from "../../typings";
import Image from "next/legacy/image";
import ReactTimeAgo from 'react-time-ago'
import {
    BookmarkIcon,
    ChatBubbleLeftEllipsisIcon,
    EllipsisHorizontalIcon,
    FaceSmileIcon,
    HeartIcon,
    PaperAirplaneIcon
} from "@heroicons/react/24/outline";
import PostProps from "@/components/PostProps";
import {useSession} from "next-auth/react";
import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    serverTimestamp,
    query,
    orderBy,
    setDoc,
    deleteDoc
} from "@firebase/firestore";
import {db} from "../../firebase.config";
import {uuidv4} from "@firebase/util";


function Post({id, username, userImage, caption, image}: FakerProp) {


    const {data: session} = useSession()

    const [isComment, isSetComment] = useState<any>("")

    const [isComments, isSetComments] = useState<any>([])

    const [isLikes, isSetLikes] = useState<any>([])

    const [hasLiked, setHasLiked] = useState<any>(false)

    const sendComment = async (e) => {

        //    prevent default i.e refresh
        e.preventDefault();
        const commentToSend = isComment;
        //After sending a comment set isSetComment to an empty string to avoid spamming
        isSetComment(' ')

        await addDoc<any>(collection(db, 'posts', `${id}`, 'comments'), {
            comment: commentToSend,
            username: session?.user?.name,
            userImg: session?.user?.image,
            timestamp: serverTimestamp(),
            uid: uuidv4()
        })
    }

    useEffect(() => {
        //A one time update listener
        return onSnapshot(query<any>(collection(db, 'posts', `${id}`, 'comments').withConverter(null), orderBy('timestamp', 'desc')), snapshot => {
            isSetComments(snapshot.docs)
        })
    })

    const likePost = async () => {

        await setDoc<any>(doc(db, 'posts', `${id}`, 'likes', `${session?.user.uid}`), {
            username: session?.user?.name
        }).then(() => {
            console.log('Liked a post, You can only like once')
        }).catch(() => {
            console.log(`You have either liked, or there is an issue`)
        })
    }

    return (
        <div className={'bg-white my-7 border rounded-t-2xl rounded-b-2xl'}>



            {/*Header*/}

            <div className={'flex items-center p-5'}>

                <img src={userImage} className={'rounded-full h-12 w-12 object-cover border p-1 mr-3'}
                     alt={'UserPhoto'}/>

                <p className={'flex-1 pl-4 font-bold'}>{username}</p>

                <PostProps Icon={EllipsisHorizontalIcon}/>
            </div>

            {/*Image*/}

            <img src={image} alt={'Posted image'} className={'w-full object-cover'}/>

            {/*Buttons*/}

            {session &&
                // Only if there is (login) session are we going to show ....
                (
                    <div className={'flex justify-between px-4 p-4'}>
                        <div className={'flex space-x-4'}>
                            <PostProps Icon={HeartIcon} />
                            <PostProps Icon={ChatBubbleLeftEllipsisIcon}/>
                            <PostProps Icon={PaperAirplaneIcon}/>
                        </div>

                        <PostProps Icon={BookmarkIcon}/>
                    </div>

                )}

            {/*Caption*/}

            <div>
                <p className={'p-5 truncate'}>
                    <span className={'font-bold mr-1'}>{username}</span>
                    {caption}
                </p>

            </div>

            {/*Comments*/}

            {isComments.length > 0 && (
                <div className={'ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'}>
                    {isComments.map((comment) => (
                            <div key={comment.data().uid} className={'flex items-center space-x-2 mb-2 '}>

                                <div>
                                    <img src={comment.data().userImg} alt={'Image'} className={'h-6 rounded-full'}/>
                                </div>

                                <p>
                                <span className={'font-medium'}>
                                {comment.data().username}
                                    &nbsp;
                                </span>
                                    {comment.data().comment}
                                </p>

                                <p>
                                    <ReactTimeAgo className={'pl-5 text-xs'} date={comment.data().timestamp?.toDate()} locale="en-US"/>
                                </p>


                            </div>
                        )
                    )
                    }
                </div>
            )}

            {/*Input Box*/}

            {session &&
                // Only if there is (login) session are we going to show ....
                (
                    <form className={'flex items-center p-4'}>
                        <PostProps Icons={FaceSmileIcon}/>
                        <input type="text" value={isComment}
                               onChange={(e) => isSetComment(e.target.value)}
                               className={'border-none flex-1 focus:ring-0 outline-none'}
                               placeholder={'Add a comment...'}/>
                        <button disabled={!isComment.trim()}
                                onClick={sendComment}
                                className={'font-semibold text-blue-500'}>Post
                        </button>
                    </form>
                )}

        </div>
    )
}

export default Post
