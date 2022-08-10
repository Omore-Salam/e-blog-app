 

 import { useState } from 'react' 

 import { Link, useNavigate } from 'react-router-dom' 

 import { getAuth, signInWithEmailAndPassword } from 'firebase/auth' 

  

 function SignIn() { 

   const [formData, setFormData] = useState({ 

     email: '', 

     password: '', 

   }) 

  

   const navigate = useNavigate() 

  

   const { email, password } = formData 

  

   const handleChange = (e) => { 

     setFormData({ 

       ...formData, 

       [e.target.name]: e.target.value, 

     }) 

   } 

  

   // Handling SignIn with email and password 

   const handleSubmit = async (e) => { 

     e.preventDefault() 

  

     try { 

       // getting auth value from getAuth 

       const auth = getAuth() 

  

       // SignIn user with email and password 

       const userCredential = await signInWithEmailAndPassword( 

         auth, 

         email, 

         password 

       ) 

  

       // Check if User has an account(validation) 

       if (userCredential.user) { 

         // if true signIn and navigate to home 

         navigate('/') 

         console.log('Welcome back!') 

       } 

     } catch (error) { 

       // if user doesn't have an account, display a toast with the error 

       console.error('Bad User Credentials') 

     } 

   } 

  

   return ( 

     <div className="container mx-auto"> 

       <div className="grid place-items-center mb-24 mx-4"> 

         <div className="w-full max-w-2xl shadow mt-6"> 

           <div className="mt-4 text-center"> 

             <h1 className="text-2xl font-bold text-white">Welcome Back!</h1> 

           </div> 

           <form onSubmit={handleSubmit}> 

             <div className="mt-4"> 

               <label className="label text-white"> 

                 <span className="label-text">Email</span> 

               </label> 

               <input 

                 type="text" 

                 name="email" 

                 value={email} 

                 onChange={handleChange} 

                 placeholder="email" 

                 className="p-2 border-2 border-gray-400 rounded-lg w-full" 

               /> 

             </div> 

             <div className="mt-4"> 

               <label className="label text-white"> 

                 <span className="label-text">Password</span> 

               </label> 

               <input 

                 type="password" 

                 name="password" 

                 value={password} 

                 onChange={handleChange} 

                 placeholder="password" 

                 className="p-2 border-2 border-gray-400 rounded-lg w-full" 

               /> 

               <label className="label flex justify-end"> 

                 <Link 

                   to="/forgot-password" 

                   className="label-text-alt link link-hover text-yellow-400" 

                 > 

                   Forgot password? 

                 </Link> 

               </label> 

             </div> 

             <div className="mt-6"> 

               <button className="bg-white text-black p-3 font-bold uppercase text-lg rounded-lg w-full"> 

                 Login 

               </button> 

             </div> 

           </form> 

           <div className="mt-6 max-w-full"> 

             <Link 

               to="/register" 

               className="block text-center bg-[#1f1e24] text-white p-3 font-bold uppercase text-md rounded-lg" 

             > 

               Create an account 

             </Link> 

           </div> 

         </div> 

       </div> 

     </div> 

   ) 

 } 

  

 export default SignIn
