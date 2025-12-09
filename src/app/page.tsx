'use client'

import LoadingPage from "@/components/LoadingPage";
import { useSession } from "next-auth/react";


export default function Home() {
  const {data: session, status} = useSession();

  if (status === "loading") return <LoadingPage/>

  if(!session) return (
    <div className="grid items-center justify-items-center min-h-screen">
      <div className="flex flex-col justify-center items-center">
        <p> Você não está logado</p>
      </div>
    </div>
  )
    
  
  return (
    <div className="grid items-center justify-items-center min-h-screen">
      <div className="flex flex-col justify-center items-center">
        <div className="animate-bounce [animation-delay:0s]">!</div>
        <h2 className="flex text-xl">
          Seção verificada 
        </h2>
        <p className="text-gray-500">bem vindo, {session?.user?.name}!</p>
      </div>
    </div>
  );
}
