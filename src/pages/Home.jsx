 

 import React from 'react' 

 import CategoryCard from '../components/CategoryCard' 

 import HomeBanner from '../components/HomeBanner' 

 import BlogCard from '../components/BlogCard' 

  

 function Home() { 

   return ( 

     <div className="mb-10"> 

       <HomeBanner /> 

       <div className="container mx-auto"> 

         <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mx-4 mt-20"> 

           <div className="md:col-span-2 sm:col-span-1"> 

             <BlogCard /> 

           </div> 

           <div className='mt-6 md:col-span-2 lg:col-span-1'> 

             <CategoryCard /> 

           </div> 

         </div> 

       </div> 

     </div> 

   ) 

 } 

  

 export default Home
