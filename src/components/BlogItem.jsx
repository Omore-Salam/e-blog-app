 

 import { Link } from 'react-router-dom' 

  

 function BlogItem({ id, listing }) { 

   return ( 

     <div className="rounded-lg bg-[#1f1e24] text-white p-2 mt-6"> 

       <div> 

         <div className="flex flex-col"> 

           <Link 

             to={`/category/${listing.type}/${listing.title}/${id}`} 

             className="mb-2" 

           > 

             <img 

               className="rounded-lg" 

               src={listing.imageUrls} 

               alt={listing.title} 

             /> 

           </Link> 

           <div className="m-4"> 

             <p className="text-sm mb-2"> 

               <span className="text-yellow-400"> 

                 <i className="fa-solid fa-clock mr-2"></i> 

               </span> 

               {listing.date} 

             </p> 

             <h1 className="text-2xl font-bold mb-4">{listing.title}</h1> 

             <p className="mt-4">{listing.quota}</p> 

           </div> 

         </div> 

         <hr className="mx-4" /> 

         <div className="flex justify-between items-center m-4 text-center"> 

           <div className="text-sm font-semibold"> 

             <h1> 

               <span className="text-yellow-400"> 

                 <i className="fa-solid fa-user text-xs mr-2"></i> 

               </span> 

               by {listing.author} 

             </h1> 

           </div> 

           <Link 

             to={`/category/${listing.type}/${listing.title}/${id}`} 

             className="text-yellow-400 text-sm font-bold" 

           > 

             Read More 

             <span className="ml-2"> 

               <i className="fa-solid fa-angles-right"></i> 

             </span> 

           </Link> 

         </div> 

       </div> 

     </div> 

   ) 

 } 

  

 export default BlogItem
