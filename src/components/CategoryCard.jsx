 

 import React from 'react' 

  

 function CategoryCard() { 

   return ( 

     <div className="py-4 px-4 bg-[#1f1e24] text-white w-full h-auto rounded-lg"> 

       <h1 className="text-xl font-semibold">Categories</h1> 

       <span className="block w-10 mt-1 mb-2 h-0.5 bg-yellow-400"></span> 

       <div className="flex flex-col"> 

         <div className="one flex justify-between mt-2 mb-2"> 

           <h1>Culture</h1> 

           <p>10</p> 

         </div> 

         <hr className="mt-1 border-dotted" /> 

         <div className="two flex justify-between mt-2 mb-2"> 

           <h1>Politics</h1> 

           <p>10</p> 

         </div> 

         <hr className="mt-1 border-dotted" /> 

         <div className="three flex justify-between mt-2 mb-2"> 

           <h1>Business</h1> 

           <p>10</p> 

         </div> 

         <hr className="mt-2 border-dotted" /> 

         <div className="three flex justify-between mt-2 mb-2"> 

           <h1>Business</h1> 

           <p>10</p> 

         </div> 

         <hr className="mt-2 border-dotted" /> 

       </div> 

     </div> 

   ) 

 } 

  

 export default CategoryCard
