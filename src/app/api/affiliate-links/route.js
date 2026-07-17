import { NextResponse } from "next/server";

const API_URL = "https://api.travelpayouts.com/links/v1/create";

/**
 * POST /api/affiliate-links
 * Body: { urls: string[], shorten?: boolean, sub_id?: string }
 * Converts brand URLs to Travelpayouts partner links via their API.
 * Requires TRAVELPAYOUTS_API_TOKEN, TRAVELPAYOUTS_MARKER, TRAVELPAYOUTS_TRS in env.
 */
export async function POST(request) {
  const token = process.env.TRAVELPAYOUTS_API_TOKEN;
  const marker = process.env.TRAVELPAYOUTS_MARKER || process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER;
  const trs = process.env.TRAVELPAYOUTS_TRS;

  if (!token) {
    return NextResponse.json(
      { error: "TRAVELPAYOUTS_API_TOKEN is not configured" },
      { status: 500 }
    );
  }
  if (!marker || !trs) {
    return NextResponse.json(
      { error: "TRAVELPAYOUTS_MARKER and TRAVELPAYOUTS_TRS are required" },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { urls, shorten = true, sub_id } = body;
  if (!Array.isArray(urls) || urls.length === 0 || urls.length > 10) {
    return NextResponse.json(
      { error: "urls must be an array of 1–10 destination URLs" },
      { status: 400 }
    );
  }

  const links = urls.map((url) => {
    const entry = { url };
    if (sub_id) entry.sub_id = sub_id;
    return entry;
  });

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": token,
      },
      body: JSON.stringify({ trs: Number(trs), marker: Number(marker), shorten, links }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to reach Travelpayouts API", detail: err.message },
      { status: 502 }
    );
  }
}
