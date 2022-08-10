 

 import { Link } from 'react-router-dom' 

  

 function createdBlog({ listing, id, onDelete, onEdit }) { 

   return ( 

     <> 

       <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 bg-white text-[#171d22] py-4 px-4 rounded-sm my-2"> 

         <div className="flex"> 

           <Link 

             to={`/category/${listing.type}/${listing.title}/${id}`} 

             className="flex flex-col justify-center gap-2 text-sm" 

           > 

             <p className="font-bold whitespace-nowrap leading-none">{listing.title}</p> 

             <p className="whitespace-nowrap text-xs font-semibold"> 

               <span className="text-yellow-400"> 

                 <i className="fa-solid fa-clock mr-2"></i> 

               </span> 

               {listing.date} 

             </p> 

           </Link> 

         </div> 

         <div className="flex gap-2"> 

           {onDelete && ( 

             <button 

               className="bg-red-400 text-white px-2 py-1 font-semibold capitalize rounded w-full h-10 whitespace-nowrap" 

               onClick={() => onDelete(id)} 

             > 

               <span> 

                 <i className="fa-solid fa-trash-can mr-2"></i> 

               </span>{' '} 

               delete 

             </button> 

           )} 

           {onEdit && ( 

             <button 

               className="bg-yellow-400 px-2 py-1 font-semibold capitalize rounded w-full h-10 whitespace-nowrap" 

               onClick={() => onEdit(id)} 

             > 

               <span> 

                 <i className="fa-solid fa-pen-to-square mr-2"></i> 

               </span>{' '} 

               edit 

             </button> 

           )} 

         </div> 

       </div> 

     </> 

   ) 

 } 

  

 export default createdBlog
