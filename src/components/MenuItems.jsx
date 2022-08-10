 

 import { Link } from 'react-router-dom' 

  

 function MenuItems({ toggle, isOpen }) { 

   return ( 

     <ul 

       className={ 

         isOpen 

           ? 'flex-col flex items-center fixed inset-0 left-1/4 uppercase bg-[#171d22]/95 backdrop-blur-md text-white font-bold justify-center gap-8 md:hidden' 

           : 'hidden' 

       } 

     > 

       <button className="cursor-pointer scale-150" onClick={toggle}> 

         <i className="fa-solid fa-circle-xmark"></i> 

       </button> 

       <li className="hover:text-yellow-400 transition-all ease-out delay-150"> 

         <Link to="/">Home</Link> 

       </li> 

       <li className="hover:text-yellow-400 transition-all ease-out delay-150"> 

         <Link to="/profile">Profile</Link> 

       </li> 

     </ul> 

   ) 

 } 

  

 export default MenuItems
