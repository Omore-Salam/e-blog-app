 

 import { useState, useEffect } from 'react' 

 import { Link, useNavigate } from 'react-router-dom' 

 import { getAuth } from 'firebase/auth' 

 import { 

   doc, 

   collection, 

   getDocs, 

   query, 

   where, 

   orderBy, 

   deleteDoc, 

 } from 'firebase/firestore' 

 import { db } from '../firebase.config' 

 import CreatedBlog from '../components/CreatedBlog' 

 import Spinner from '../components/Spinner' 

  

 function Profile() { 

   const [listings, setListings] = useState(null) 

   const [loading, setLoading] = useState(true) 

   const [user, setUser] = useState('') 

  

   const auth = getAuth() 

   const navigate = useNavigate() 

  

   useEffect(() => { 

     setUser(auth.currentUser) 

   }, [auth.currentUser]) 

  

   useEffect(() => { 

     const fetchListing = async () => { 

       const listingRef = collection(db, 'listings') 

       const q = query( 

         listingRef, 

         where('userRef', '==', auth.currentUser.uid), 

         orderBy('timestamp', 'desc') 

       ) 

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

  

     fetchListing() 

   }, [auth.currentUser.uid]) 

  

   // LogOut the user 

   const handleLogOut = () => { 

     auth.signOut() 

     navigate('/') 

   } 

  

   // Delete the user's listing 

   const onDelete = async (listingId) => { 

     if (window.confirm('Are you sure you want to delete this listing?')) { 

       await deleteDoc(doc(db, 'listings', listingId)) 

       const updatedListing = listings.filter( 

         (listing) => listing.id !== listingId 

       ) 

       setListings(updatedListing) 

     } 

   } 

  

   // edit the user's listing 

   const onEdit = (listingId) => { 

     navigate(`/editBlog/${listingId}`) 

   } 

  

   return ( 

     <div className="mt-4 text-[#1f1e24]"> 

       <div className="2xl:container mx-auto"> 

         <div className="grid md:grid-cols-2 sm:grid-cols-1 mx-4 items-center mb-16 gap-4"> 

           <div className="w-full rounded-lg bg-yellow-400  py-8 px-4"> 

             <h1 className="font-bold text-2xl">Personal Details</h1> 

             <div className="mt-2"> 

               <h5 className="text-sm"> 

                 <span>{user.displayName && 'Name : '}</span> {user.displayName} 

               </h5> 

               <p className="text-xs"> 

                 <span className="font-bold text"> 

                   {user.email && 'Email : '} 

                 </span> 

                 {user.email} 

               </p> 

             </div> 

             <div className="grid md:grid-cols-2 gap-2 sm:grid-cols-1 w-full"> 

               <button 

                 onClick={handleLogOut} 

                 className="w-full font-semibold bg-[#1f1e24] text-white uppercase mt-6 p-2 rounded-xl hover:text-yellow-400 hover:scale-[0.98]" 

               > 

                 <span> 

                   <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i> 

                 </span>{' '} 

                 Logout 

               </button> 

               <div className="bg-white text-[#171d22] lg:mt-6 md:mt-4 sm:mt-2 p-2 rounded-xl text-center hover:text-yellow-400 hover:scale-[0.98]"> 

                 <Link to="/createBlog" className="uppercase font-bold"> 

                   <span> 

                     <i className="fa-solid fa-circle-plus mr-2"></i> 

                   </span> 

                   Create A Blog 

                 </Link> 

               </div> 

             </div> 

           </div> 

  

           <div className="text-white w-full"> 

             <h2 className="font-semibold uppercase">List of Created Blogs</h2> 

             <div> 

               {loading ? ( 

                 <Spinner /> 

               ) : listings && listings.length > 0 ? ( 

                 <> 

                   {listings.map((listing) => ( 

                     <CreatedBlog 

                       key={listing.id} 

                       id={listing.id} 

                       listing={listing.data} 

                       onDelete={() => onDelete(listing.id)} 

                       onEdit={() => onEdit(listing.id)} 

                     /> 

                   ))} 

                 </> 

               ) : ( 

                 <div> 

                   <p>No listings found</p> 

                 </div> 

               )} 

             </div> 

           </div> 

         </div> 

       </div> 

     </div> 

   ) 

 } 

  

 export default Profile
