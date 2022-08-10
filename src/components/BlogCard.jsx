 

 import { useState, useEffect } from 'react' 

 import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore' 

 import { db } from '../firebase.config' 

 import BlogItem from './BlogItem' 

 import Spinner from './Spinner' 

  

 function BlogCard() { 

   const [listings, setListings] = useState(null) 

   const [loading, setLoading] = useState(true) 

  

   useEffect(() => { 

     const fetchListings = async () => { 

       const listingRef = collection(db, 'listings') 

       const q = query(listingRef, orderBy('timestamp', 'desc'), limit(3)) 

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

  

   return ( 

     <div> 

       {loading ? ( 

         <Spinner /> 

       ) : listings && listings.length > 0 ? ( 

         <> 

           {listings.map((listing) => ( 

             <BlogItem key={listing.id} id={listing.id} listing={listing.data} /> 

           ))} 

         </> 

       ) : ( 

         <div> 

           <p>No listings found</p> 

         </div> 

       )} 

     </div> 

   ) 

 } 

  

 export default BlogCard
