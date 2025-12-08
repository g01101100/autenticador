'use client'
import { useState } from "react"
import Image from "next/image"
import Google_logo from '@/app/assets/Google_Logo.svg'
import { signIn } from 'next-auth/react'
import Link from "next/link"

export default function Login(){
     const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
    
        const inputStyle = "w-full px-2 py-1 outline-1 outline-gray-300 -outline-offset-1 rounded-sm bg-gray-100 text-xl text-black"
    
        function criarUser(){
            const data = {
                username: username,
                password: password,
            }
            fetch('http://localhost:3000/register',{
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then( response => response.json())
            .then( data => console.log(data))
            .catch( erro => console.log(erro))
        }
    
        return(
            <div className="w-screen h-screen flex justify-center items-center">
                <div className="flex flex-col grid-cols-1 items-center pt-10 pb-20 px-10 aspect-7/10 w-xl bg-gray-700">
                <form method="POST" className="flex flex-col justify-between gap-5 h-7/10 w-full">
                    <h1 className="flex justify-center items-center text-5xl font-bold">Login</h1>
                    <div className="flex flex-col justify-between w-full gap-5">
                        <input 
                        type="text"
                        name="username"
                        id="username"
                        placeholder="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={inputStyle}/>
                    
                        <input 
                        type="text"
                        name="password"
                        id="password"
                        placeholder="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={inputStyle}/>
                    </div>
                        
                    <div className="flex flex-col w-full gap-5">
                        <Link href="/register" className="flex justify-center items-center w-full rounded-sm py-4 bg-white text-xl text-black cursor-pointer">
                            Registrar
                        </Link>
                    </div>
                </form>
                    <p className="my-10 text-gray-500">------------------------------------------- ou -------------------------------------------</p>
                        <button 
                        onClick={() => signIn("google", {callbackUrl: "/"})} 
                        id="google" 
                        name="google" 
                        value="Google" 
                        className="flex justify-center items-center w-full rounded-sm py-3 bg-white text-xl text-black cursor-pointer">
                            <Image src={Google_logo} alt="Google Logo"/>
                        </button>
                </div>
            </div>
        )
}