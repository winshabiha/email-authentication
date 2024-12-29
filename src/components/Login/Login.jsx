import React, { useState } from 'react';
import { FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FiLogOut } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut ,GithubAuthProvider} from "firebase/auth";
import app from '../../../firebase/firebase.config';

const Login = () => {
    const [user,setUser] = useState(null)
    console.log(user)
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const auth = getAuth(app);
    const handleGoogleLogin=()=>{
        signInWithPopup(auth,googleProvider)
    .then(result=>{
        const signInUser = result.user
        setUser(signInUser)
    })
    .catch(error=>{
        console.log(error.message)
    })
    }

    const handleGithubLogin=()=>{
        signInWithPopup(auth,githubProvider)
        .then(result=>{
            const loginUser = result.user
            setUser(loginUser)
            console.log(user)
        })
        .catch(err=>{
            console.log(err.message)
        })
    }

    const logOut = ()=>{
        signOut(auth)
        .then(()=>{
            setUser(null)
        })
        .catch(error=>{
            console.log(error.message)
        })
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    {
                        user && <div>
                            <p className="py-6 text-2xl">{user.displayName}</p>
                            <p className="text-2xl flex items-center justify-center gap-2"><SiGmail className='text-red-600'/>{user.email}</p>
                            <div className='mt-8'><img src={user.photoURL} alt="" /></div>
                        </div>                    }
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    {
                        user?<button className="btn btn-neutral" onClick={logOut}><FiLogOut className='text-3xl' />Log Out</button>:
                        <div>
                            <button className="btn btn-neutral" onClick={handleGoogleLogin}><FcGoogle className='text-3xl' />Login With Google</button>
                            <button className="btn btn-neutral mt-5" onClick={handleGithubLogin}><FaGithub className='text-3xl' />Login With Github</button>
                        </div>
                    }
                    
                    
                </div>
            </div>
        </div>
    );
};

export default Login;