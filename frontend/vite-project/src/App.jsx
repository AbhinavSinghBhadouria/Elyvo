import { useState } from 'react'
import './App.css'
import {SignedIn, SignInButton, SignOutButton, SignedOut, UserButton} from "@clerk/clerk-react";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>
        Welcome to the App
      </h1>
      <SignedOut>
              <SignInButton mode="modal"/>
      </SignedOut>

      <SignedIn>
        <SignOutButton/>
      </SignedIn>
      <UserButton/>
    </>
  )
}

export default App
