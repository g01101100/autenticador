'use client'

import { useSession } from "next-auth/react";

export default function Home() {
  const {data: session, status} = useSession();

  if (status === "loading") return(
    <div className="grid items-center justify-items-center min-h-screen">
      <div className="flex flex-col justify-center items-center">
        <p>Carregando...</p>
      </div>
    </div>
  ) 

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
        <h2 className="text-xl">Seção verificada!!!</h2>
        <p className="text-gray-500">bem vindo, {session?.user?.name}!</p>
      </div>
    </div>
  );
}
