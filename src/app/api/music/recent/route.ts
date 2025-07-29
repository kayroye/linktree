import { NextResponse } from "next/server";
import { getRecentMusic } from "@/app/actions/music";
import { withRateLimit } from "@/lib/kvRateLimit";

export const GET = withRateLimit(async () => {
  const recentMusic = await getRecentMusic();
  if ("error" in recentMusic) {
    return NextResponse.json({ error: recentMusic.error }, { status: 500 });
  }
  return NextResponse.json(recentMusic);
}, {
  limit: 15,
  window: "1 m",
});