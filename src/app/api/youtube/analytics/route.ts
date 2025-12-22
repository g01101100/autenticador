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
    "https://www.googleapis.com/youtube/v3/channels?part=id&mine=true",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const channelData = await channelRes.json();
  const channelId = channelData.items?.[0]?.id;

  if (!channelId) {
    return NextResponse.json(
      { error: "Channel not found" },
      { status: 400 }
    );
  }

  const analyticsRes = await fetch(
    `https://youtubeanalytics.googleapis.com/v2/reports` +
      `?ids=channel==${channelId}` +
      `&startDate=2024-01-01` +
      `&endDate=2025-12-19` +
      `&metrics=views,estimatedMinutesWatched` +
      `&maxResult=10`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const analyticsData = await analyticsRes.json();

  return NextResponse.json(analyticsData);
}
