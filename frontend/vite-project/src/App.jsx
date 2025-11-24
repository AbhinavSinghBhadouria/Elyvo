import { useState } from 'react'
import './App.css'
import {SignedIn, SignInButton, SignOutButton, SignedOut, UserButton} from "@clerk/clerk-react";
import {Routes} from "react-router";

function App() {
  const {isSignedIn} = useUser()

  return (
    <>
    <Routes>
      <Route path = "/"  element={<HomePage/>} />
      <Route path = "/problems"  element={isSignedIn? <ProblemsPage/>: <Navigate to= {"/"}/>} />
      <Route path = "/"  element={<HomePage/>} />

    </Routes>

      
    <Toaster toastOptions = {{duration : 3000}}/>
    </>
  )
}

export default App
// we have done tailwind css , daisyui,  react-router- react-hot-toast,
// now we will do tasks such as react-query aka tanstack query, axios