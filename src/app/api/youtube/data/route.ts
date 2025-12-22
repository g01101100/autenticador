import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const accessToken = session.accessToken;


  const channelRes = await fetch(
    "https://www.googleapis.com/youtube/v3/channels?part=statistics&snnipet&mine=true",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const channelData = await channelRes.json();

  if (!channelData.items || channelData.items.length === 0) {
     return NextResponse.json({ error: "Canal não encontrado" }, { status: 404 });
  }

  return NextResponse.json(channelData)
}