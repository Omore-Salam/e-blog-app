 

 import React from 'react' 

  

 function Footer() { 

   const year = new Date().getFullYear() 

  

   return ( 

     <footer className="fixed right-0 bottom-0 left-0 footer place-items-center p-4 bg-[#171d22] text-white"> 

       <div className="items-center"> 

         <p className="text-center"> 

           Copyright © <strong>OMORE</strong> {year} - All right reserved 

         </p> 

       </div> 

     </footer> 

   ) 

 } 

  

 export default Footer
