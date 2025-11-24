import { SignInButton } from "@clerk/clerk-react";
import { SignedIn, SignInButton, SignOutButton, SignedOut, UserButton } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

function HomePage(){
    return <div>

        <button className="btn btn-secondary" onClick={()=>TransformStream.success("This is a succcess Toast")}>Click me</button>

        <SignedOut>
            <SignInButton mode="modal">
                <button>Login</button>
            </SignInButton>
        </SignedOut>

        <SignedIn>
            <SignedOutButton/>
        </SignedIn>

        <UserButton/>
    </div>
}

export default HomePage