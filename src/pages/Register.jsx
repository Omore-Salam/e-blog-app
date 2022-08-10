 

 import { useState } from 'react' 

 import { Link, useNavigate } from 'react-router-dom' 

 import { 

   getAuth, 

   createUserWithEmailAndPassword, 

   updateProfile, 

 } from 'firebase/auth' 

 import { doc, serverTimestamp, setDoc } from 'firebase/firestore' 

 import { db } from '../firebase.config' 

  

 function Register() { 

   const [formData, setFormData] = useState({ 

     name: '', 

     email: '', 

     password: '', 

   }) 

  

   const navigate = useNavigate() 

  

   const { name, email, password } = formData 

  

   const handleChange = (e) => { 

     setFormData({ 

       ...formData, 

       [e.target.name]: e.target.value, 

     }) 

   } 

  

   // Handling Registration with email and password 

   const handleSubmit = async (e) => { 

     e.preventDefault() 

  

     try { 

       // getting auth value from getAuth 

       const auth = getAuth() 

  

       // Register user 

       const userCredential = await createUserWithEmailAndPassword( 

         auth, 

         email, 

         password 

       ) 

  

       // Get User information 

       const user = userCredential.user 

  

       // Update the displayName of the user 

       updateProfile(auth.currentUser, { 

         displayName: name, 

       }) 

  

       // copying fromData to formDataCopy without changing it 

       const formDataCopy = { ...formData } 

  

       // Delete the password before storing userCredential in firebase 

       delete formDataCopy.password 

  

       // creating a timestammp for each user stored in firebase 

       formDataCopy.timestammp = serverTimestamp() 

  

       // Storing the user to firebase 

       await setDoc(doc(db, 'users', user.uid), formDataCopy) 

  

       // If successful Registration, Navigate to Home and display a toast 

       navigate('/') 

     } catch (error) { 

       // If unsuccessful Registration, display a toast with the error 

     } 

   } 

  

   return ( 

     <div className="container mx-auto"> 

       <div className="grid place-items-center mb-24 mx-4"> 

         <div className="w-full max-w-2xl shadow mt-6"> 

           <div className="mt-4 text-center"> 

             <h1 className="text-2xl font-bold text-white">Create An Account</h1> 

           </div> 

           <form onSubmit={handleSubmit}> 

             <div className="mt-4"> 

               <label className="label text-white"> 

                 <span className="label-text">Name</span> 

               </label> 

               <input 

                 type="text" 

                 name="name" 

                 value={name} 

                 onChange={handleChange} 

                 placeholder="fullname" 

                 className="p-2 border-2 border-gray-400 rounded-lg w-full" 

               /> 

             </div> 

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

             </div> 

             <div className="mt-6"> 

               <button className="bg-white text-black p-3 font-bold uppercase text-lg rounded-lg w-full"> 

                 Register 

               </button> 

             </div> 

           </form> 

           <div className="mt-6 max-w-full"> 

             <Link 

               to="/signin" 

               className="block text-center bg-[#1f1e24] text-white p-3 font-bold uppercase text-md rounded-lg" 

             > 

               Login 

             </Link> 

           </div> 

         </div> 

       </div> 

     </div> 

   ) 

 } 

  

 export default Register
