import React, {Fragment, useRef, useState} from 'react'
import {useRecoilState} from "recoil";
import {modalState} from "@/atoms/modalAtom";
import {Dialog, Transition} from "@headlessui/react";
import {CameraIcon} from "@heroicons/react/24/solid";
import {XCircleIcon} from "@heroicons/react/20/solid";
import {addDoc, collection, doc, serverTimestamp, updateDoc} from "@firebase/firestore";
import {db} from "../../firebase.config";
import {useSession} from "next-auth/react";
import {storage} from '../../firebase.config';
import {ref, getDownloadURL, uploadString} from "@firebase/storage";
import {uuidv4} from "@firebase/util";

function Modal() {
    const {data: session} = useSession();
    const [open, setOpen] = useRecoilState(modalState)
    const filePickerRef = useRef(null)
    const [selectedFile, setSelectedFile] = useState<any>(null)
    const [isLoading, isSetLoading] = useState<any>(false)
    const captionRef = useRef(null)
    const uploadPost = async () => {
        if (isLoading) return

        isSetLoading(true)

        //    Create a post and add to firestore posts collection
        //    get post ID for newly created post
        //    upload image to firebase with post ID
        //    get download url from firebase storage and update the originsl post with image


        const docRef = await addDoc(collection(db, 'posts'), {
            uid: uuidv4(),
            username: session?.user?.name,
            caption: captionRef.current.value,
            profileImg: session?.user?.image,
            timestamp: serverTimestamp()
        })

        console.log(docRef.id)

        const imageRef = ref(storage, `posts/${docRef.id}/image`)


        //File stored in the local state uploaded to fire storage, retrieve the url afterwards
        await uploadString(imageRef, selectedFile, 'data_url').then(async snapshot => {

            const downloadUrl = await getDownloadURL(imageRef)

            await updateDoc<any>(doc(db, 'posts', `${docRef.id}`),
                {
                    image: downloadUrl,
                    newId: docRef.id
                }
            ).then(() => {
                setOpen(false)
                isSetLoading(false)
                setSelectedFile(null)
            })
        })


    }
    const addImageToPost = (e) => {

        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            //    File location is picked
            reader.onload = (readerEvent) => {
                setSelectedFile(readerEvent.target?.result)
            }
            //    Here we set the file as an object to setSe...
        }
    }

    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as='div' className={'fixed z-10 inset-0 overflow-y-auto'}
                        onClose={setOpen}>

                    <div
                        className={'flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 pb-20 text-center sm:block sm:p-0'}>
                        <Transition.Child
                            as={Fragment}
                            enter={'ease-out duration-300'}
                            enterFrom={'opacity-0'}
                            enterTo={'opacity-100'}
                            leave={'ease-in duration-200'}
                            leaveTo={'opacity-0'}>
                            <Dialog.Overlay
                                className={'fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'}
                            />
                        </Transition.Child>

                        {/*  Trick the browser into centering modal contents  */}

                        <span className={'hidden sm:inline-block sm:align-middle sm:h-screen'} aria-hidden='true'>
                            &#8203
                    </span>

                        <Transition.Child
                            as={Fragment}
                            enter={'ease-out duration-300'}
                            enterFrom={'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}
                            enterTo={'opacity-100 translate-y-0 sm:scale-100'}
                            leave={'ease-in duration-200'}
                            leaveFrom={'opacity-0 translate-y-0 sm:scale-100'}
                            leaveTo={'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}>
                            <div
                                className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-0 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                <div>

                                    {selectedFile ? (
                                            <>
                                                <XCircleIcon className={'navBtn'} onClick={() => setSelectedFile(null)}/>
                                                <img src={selectedFile} alt={'Chosen image'}
                                                     className={'w-full object-contain cursor-pointer h-64'}/>
                                            </>
                                        ) :

                                        (<div onClick={() => filePickerRef.current.click()}
                                              className={'mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer'}>
                                            <CameraIcon className={'h-6 w-6 text-red-600'} aria-hidden='true'/>
                                        </div>)

                                    }
                                    {/* Fake a click - this is going to trigger the hidden input file picker*/}
                                    <div>
                                        <div className="mt-3 text-center sm:mt-3">
                                            <Dialog.Title
                                                as='h3' className={'text-lg loading-6 font-medium text-gray-900'}>
                                                Upload a photo
                                            </Dialog.Title>
                                        </div>
                                        <div>
                                            <input ref={filePickerRef} type='file' hidden onChange={addImageToPost}/>
                                        </div>
                                        <div className={'mt-2'}>
                                            <input type="text"
                                                   className={'border-none focus:ring-0 w-full text-center placeholder:font-light'}
                                                   placeholder='Please enter a caption...'
                                                   ref={captionRef}

                                            />
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button type='button' onClick={() => uploadPost()}
                                                className={'inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:ring-2 focus:outline-none focus:ring-offset-2 focus:ring-red-500 sm-text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300'}
                                        >
                                            {isLoading ? (
                                                <span className={'animate-pulse'}>uploading...</span>) : 'Upload post!'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

export default Modal
