'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function register(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const inputStyle = "w-full px-2 py-1 outline-1 outline-gray-300 -outline-offset-1 rounded-sm bg-gray-100 text-xl text-black";
    const router = useRouter();

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
        .then( response => {
            const json = response.json();
            const status = response.status;
            return {json, status}
        })
        .then( ({json, status}) => {
            console.log({"JSON": json});
            console.log({"status": status});
            if(status == 201){
                alert("Usuário criado com sucesso!!")
                router.push("/login")
            }
            
        })
        .catch( erro => console.log(erro))
        
    }

    return(
        <div className="w-screen h-screen flex justify-center items-center">
            <form method="POST" onSubmit={criarUser} className="flex flex-col grid-cols-1 justify-between items-center pt-10 pb-20 px-10 aspect-7/10 w-xl bg-gray-700">
                <h1 className="flex justify-center items-center text-5xl font-bold">Registrar</h1>
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
                <div className="w-full">
                    <input 
                    type="submit" 
                    id="submit" 
                    name="submit" 
                    value="Registrar" 
                    className="w-full rounded-sm py-5 bg-white text-xl text-black cursor-pointer"/>
                </div>
            </form>
        </div>
    )
}