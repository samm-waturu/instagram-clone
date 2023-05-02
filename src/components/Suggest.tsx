import React, {useEffect, useState} from 'react'
import FakerFields from "@/components/FakerFields";
import Contacts from "@/components/Contacts";

function Suggest() {

    const [isSuggest, isSetSuggest] = useState([])

    useEffect(() => {
        let profiles = [];
        Array.from({length: 5}).forEach(() => {
            profiles.push(FakerFields())
        })
        isSetSuggest(profiles)
        // console.log(users)
    }, [])

    return (
        <div className={'mt-4 ml-10'}>

            <div className={'flex justify-between text-sm mb-5'}>

                <h3 className={'text-sm font-bold text-gray-400'}>
                    Suggestions for you
                </h3>

                <button className={'text-gray-600 font-semibold'}>
                    See all
                </button>

            </div>


                {
                    isSuggest.map(profile => ( //implicit return
                            <Contacts key={profile.userId} id={profile.userId} image={profile.avatar}
                                      name={profile.username} company={profile.works}/>
                        )
                    )
                }

        </div>
    )
}

export default Suggest
