 

 import { useState, useEffect } from 'react' 

 import { useNavigate } from 'react-router-dom' 

 import { getAuth, onAuthStateChanged } from 'firebase/auth' 

 import { 

   getStorage, 

   ref, 

   uploadBytesResumable, 

   getDownloadURL, 

 } from 'firebase/storage' 

 import { addDoc, collection, serverTimestamp } from 'firebase/firestore' 

 import { db } from '../firebase.config' 

 import { v4 as uuidv4 } from 'uuid' 

 import Spinner from '../components/Spinner' 

  

 function CreatingBlog() { 

   const [loading, setLoading] = useState(false) 

   const [formData, setFormData] = useState({ 

     author: '', 

     date: '', 

     title: '', 

     type: '', 

     quota: '', 

     article: '', 

     images: {}, 

   }) 

  

   const { author, date, title, type, quota, article, images } = formData 

  

   const navigate = useNavigate() 

   const auth = getAuth() 

  

   useEffect(() => { 

     onAuthStateChanged(auth, (user) => { 

       if (user) { 

         setFormData({ ...formData, userRef: user.uid }) 

       } else { 

         navigate('/sign-in') 

       } 

     }) 

     // eslint-disable-next-line react-hooks/exhaustive-deps 

   }, []) 

  

   const onMutate = (e) => { 

     // Files 

     if (e.target.files) { 

       setFormData((prevState) => ({ 

         ...prevState, 

         images: e.target.files, 

       })) 

     } 

     // Strings / Text 

     if (!e.target.files) { 

       setFormData((prevState) => ({ 

         ...prevState, 

         [e.target.id]: e.target.value, 

       })) 

     } 

   } 

  

   const onSubmit = async (e) => { 

     e.preventDefault() 

  

     setLoading(true) 

  

     // Validation for Image 

     // if (images.length > 2) { 

     //   setLoading(false) 

     //   alert('You can only upload 2 images') 

     //   return 

     // } 

     const storeImage = async (image) => { 

       return new Promise((resolve, reject) => { 

         const storage = getStorage() 

  

         const fileName = `${auth.currentUser.uid}-${image.title}-${uuidv4()}` 

  

         const storageRef = ref(storage, 'images/' + fileName) 

  

         const uploadTask = uploadBytesResumable(storageRef, image) 

  

         uploadTask.on( 

           'state_changed', 

           (snapshot) => { 

             const progress = 

               (snapshot.bytesTransferred / snapshot.totalBytes) * 100 

             console.log('Upload is ' + progress + '% done') 

             switch (snapshot.state) { 

               case 'paused': 

                 console.log('upload is pause') 

                 break 

               case 'running': 

                 console.log('upload is running') 

                 break 

               default: 

                 break 

             } 

           }, 

           (error) => { 

             reject(error) 

           }, 

           () => { 

             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { 

               resolve(downloadURL) 

             }) 

           } 

         ) 

       }) 

     } 

  

     // getting all the uploaded imageUrls from firestore and adding it to the image input 

     const imageUrls = await Promise.all( 

       [...images].map((image) => storeImage(image)) 

     ).catch(() => { 

       setLoading(false) 

       alert('Something went wrong') 

       return 

     }) 

  

     // setting all data gotten from the formData and uploaded imageUrls with goelocation to the formDataCopy 

     const formDataCopy = { 

       ...formData, 

       imageUrls, 

       timestamp: serverTimestamp(), 

     } 

     // Cleaning up things we dont need in the formDataCopy 

     delete formDataCopy.images 

  

     // Saving formDataCopy to the firebase database 

     const docRef = await addDoc(collection(db, 'listings'), formDataCopy) 

     setLoading(false) 

     navigate( 

       `/category/${formDataCopy.type}/${formDataCopy.title}/${docRef.id}` 

     ) 

   } 

  

   if (loading) { 

     return <Spinner /> 

   } 

  

   return ( 

     <> 

       <header className='"mt-4'> 

         <p className="font-bold text-2xl text-center uppercase">Create Blog</p> 

       </header> 

       <main className="mt-8 lg:mx-auto mx-4 md:w-2/3 sm:w-full uppercase"> 

         <form onSubmit={onSubmit} className="mb-8 p-2"> 

           <div className="grid md:grid-cols-2 gap-3 sm:grid-cols-1"> 

             <div className="form-control mb-4"> 

               <label className="mb-1 text-md font-semibold text-white"> 

                 Author 

               </label> 

               <input 

                 className="p-2 border-2 border-gray-400 rounded-lg w-full" 

                 type="text" 

                 id="author" 

                 value={author} 

                 onChange={onMutate} 

                 placeholder="John Doe" 

                 required 

               /> 

             </div> 

             <div className="form-control mb-4"> 

               <label className="mb-1 text-md font-semibold text-white"> 

                 Date 

               </label> 

               <input 

                 className="p-2 border-2 border-gray-400 rounded-lg w-full" 

                 type="text" 

                 id="date" 

                 value={date} 

                 onChange={onMutate} 

                 placeholder="31 May 2022" 

                 required 

               /> 

             </div> 

           </div> 

           <div className="grid md:grid-cols-2 gap-3 sm:grid-cols-1"> 

             <div className="form-control mb-4"> 

               <label className="mb-1 text-md font-semibold text-white"> 

                 Title 

               </label> 

               <input 

                 className="p-2 border-2 border-gray-400 rounded-lg w-full" 

                 type="text" 

                 id="title" 

                 value={title} 

                 onChange={onMutate} 

                 placeholder="The End of Civilization" 

                 required 

               /> 

             </div> 

             <div className="form-control mb-4"> 

               <label className="mb-1 text-md font-semibold text-white"> 

                 Type 

               </label> 

               <input 

                 className="p-2 border-2 border-gray-400 rounded-lg w-full" 

                 type="text" 

                 id="type" 

                 value={type} 

                 onChange={onMutate} 

                 placeholder="History" 

                 required 

               /> 

             </div> 

           </div> 

           <div className="form-control mb-4 h-24"> 

             <label className="mb-1 text-md font-semibold text-white"> 

               Quota 

             </label> 

             <textarea 

               className="p-1 border-2 border-gray-400 rounded-lg h-full w-full" 

               type="text" 

               id="quota" 

               value={quota} 

               onChange={onMutate} 

               required 

             ></textarea> 

           </div> 

           <div className="mb-4 mt-8 h-80"> 

             <label className="mb-1 text-md font-semibold text-white"> 

               Article 

             </label> 

             <textarea 

               className="p-1 border-2 border-gray-400 rounded-lg w-full h-full resize-none" 

               type="text" 

               id="article" 

               value={article} 

               onChange={onMutate} 

               required 

             ></textarea> 

           </div> 

           <div className="form-control mb-4 mt-8"> 

             <label className="mb-2 text-lg font-semibold">Article Images</label> 

             <p className="text-sm text-gray-400"> 

               The image will be the cover (max 1) 

             </p> 

             <div className="flex items-center"> 

               <input 

                 className="p-1 border-2 border-gray-400 rounded-lg cursor-pointer text-white" 

                 type="file" 

                 id="images" 

                 onChange={onMutate} 

                 max="2" 

                 accept=".jpp,.png,.jpeg" 

                 multiple 

                 required 

               /> 

             </div> 

           </div> 

           <div className="form-control mb-6 mt-10"> 

             <button 

               type="submit" 

               className="bg-white text-black p-3 font-bold uppercase text-lg rounded-lg w-full" 

             > 

               Create Blog 

             </button> 

           </div> 

         </form> 

       </main> 

     </> 

   ) 

 } 

  

 export default CreatingBlog
