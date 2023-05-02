import React, {useEffect, useState} from 'react'
import Post from "@/components/Post";
import {collection, onSnapshot, orderBy, query} from "@firebase/firestore";
import {db} from "../../firebase.config";

/*
const Faker = [

    {
        id: '01',
        userImg: 'https://links.papareact.com/3ke',
        image: 'https://links.papareact.com/3ke',
        userName: 'dummy_01',
        caption: 'Lorem ipsum....',
    },

    {
        id: '02',
        userImg: 'https://links.papareact.com/3ke',
        image: 'https://links.papareact.com/3ke',
        userName: 'dummy_02',
        caption: 'Lorem ipsum....',
    },

    {
        id: '03',
        userImg: 'https://links.papareact.com/3ke',
        image: 'https://links.papareact.com/3ke',
        userName: 'dummy_03',
        caption: 'Lorem ipsum....',
    },

    {
        id: '04',
        userImg: 'https://links.papareact.com/3ke',
        image: 'https://links.papareact.com/3ke',
        userName: 'dummy_04',
        caption: 'Lorem ipsum....',
    },

]


 */

function Posts() {

    const [isPosts, isSetPosts] = useState([])

    useEffect(() => {
        return onSnapshot(query(collection(db, 'posts'),
            orderBy('timestamp', 'desc')), snapshot => {
            isSetPosts(snapshot.docs)
        })
    }, [db])

    // console.log(isPosts)

    return (
        <>

            <div>
                {isPosts.map((post) => (
                        <Post key={post.data().uid} id={post.data().newId} username={post.data().username} userImage={post.data().profileImg}
                              caption={post.data().caption} image={post.data().image}/>
                    )
                )}
            </div>


        </>
    )
}

export default Posts
