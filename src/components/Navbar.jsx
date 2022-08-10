 

 import { useState, useEffect } from 'react' 

 import { Link, useLocation } from 'react-router-dom' 

 import MenuItems from './MenuItems' 

  

 function Navbar() { 

   const [isOpen, setIsOpen] = useState(false) 

  

   // toggle the navbar on mobile devices 

   const toggle = () => { 

     setIsOpen(!isOpen) 

   } 

  

   // get the current path 

   const location = useLocation() 

  

   useEffect(() => { 

     // when the path changes, close the navbar on mobile devices 

     const handChange = () => { 

       setIsOpen(false) 

     } 

     handChange() 

   }, [location]) 

  

   return ( 

     <header className="sticky top-0 z-20 w-full flex justify-between p-2 items-center bg-[#171d22] text-white"> 

       <div className="text-2xl font-extrabold text-center md:ml-10"> 

         <h1 className="text-xl uppercase"> 

           <span className="text-2xl lowercase text-yellow-400">e</span>blog 

         </h1> 

       </div> 

       <nav className="text-sm"> 

         <div className="absolute right-6 top-4 md:hidden scale-150"> 

           <button className="scale-125 cursor-pointer" onClick={toggle}> 

             <i className="fa-solid fa-bars"></i> 

           </button> 

         </div> 

         <ul className="hidden md:flex gap-8 p-4 uppercase font-bold mr-10"> 

           <li className="hover:text-yellow-400 transition-all ease-out delay-150"> 

             <Link to="/">Home</Link> 

           </li> 

           <li className="hover:text-yellow-400 transition-all ease-out delay-150"> 

             <Link to="/profile">Profile</Link> 

           </li> 

         </ul> 

         <MenuItems toggle={toggle} isOpen={isOpen} /> 

       </nav> 

     </header> 

   ) 

 } 

  

 export default Navbar
