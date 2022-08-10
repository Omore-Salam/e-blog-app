 

 import { useState, useEffect } from 'react' 

 import { useNavigate } from 'react-router-dom' 

 import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore' 

 import { db } from '../firebase.config' 

 import Spinner from './Spinner' 

  

 function RecentPost() { 

   const [listings, setListings] = useState(null) 

   const [loading, setLoading] = useState(true) 

  

   const navigate = useNavigate() 

  

   useEffect(() => { 

     const fetchListings = async () => { 

       const listingRef = collection(db, 'listings') 

       const q = query(listingRef, orderBy('timestamp', 'desc'), limit(4)) 

       const querySnap = await getDocs(q) 

  

       let listings = [] 

  

       querySnap.forEach((doc) => { 

         return listings.push({ 

           id: doc.id, 

           data: doc.data(), 

         }) 

       }) 

       setListings(listings) 

       setLoading(false) 

     } 

     fetchListings() 

   }, []) 

  

   if (loading) { 

     return <Spinner /> 

   } 

  

   if (listings.length === 0) { 

     return <></> 

   } 

  

   return ( 

     listings && ( 

       <div className="mt-2 bg-[#1f1e24] rounded-lg overflow-hidden"> 

         <h1 className="text-xl font-semibold">Recent Posts</h1> 

         <span className="block w-10 mt-1 mb-2 h-0.5 bg-yellow-400"></span> 

         {listings.map(({ id, data }) => ( 

           <div 

             className="flex capitalize cursor-pointer" 

             key={data.title} 

             onClick={() => 

               navigate(`/category/${data.type}/${data.title}/${id}`) 

             } 

           > 

             <div className="max-w-full w-24 h-auto mb-2 bg-white m-2"> 

               <img 

                 className="w-full bg-contain  p-1" 

                 src={data.imageUrls} 

                 alt="postImage" 

               /> 

             </div> 

             <div className="text-white col-span-2 ml-4 "> 

               <p className="md:text-lg lg:text-sm font-bold mt-1 leading-tight"> 

                 {data.title} 

               </p> 

               <p className="text-xs mt-2"> 

                 <span className="text-yellow-400 mr-2"> 

                   <i className="fa-solid fa-clock"></i> 

                 </span> 

                 {data.date} 

               </p> 

             </div> 

           </div> 

         ))} 

       </div> 

     ) 

   ) 

 } 

  

 export default RecentPost
