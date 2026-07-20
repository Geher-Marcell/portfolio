import { NextRequest } from "next/server";

export const revalidate = 86400;

const EXTERNAL_API = "https://gh-calendar.rschristian.dev/user";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const username = searchParams.get("username");

	if (!username) {
		return Response.json(
			{ error: "Username is required" },
			{ status: 400 }
		);
	}

	try {
		const res = await fetch(`${EXTERNAL_API}/${encodeURIComponent(username)}`, {
			headers: { Accept: "application/json" },
		});

		if (!res.ok) {
			return Response.json(
				{ error: `GitHub API returned ${res.status}` },
				{ status: res.status }
			);
		}

		const data = await res.json();

		return Response.json(data);
	} catch (error) {
		console.error("Failed to fetch GitHub calendar data:", error);
		return Response.json(
			{ error: "Failed to fetch contribution data" },
			{ status: 500 }
		);
	}
}
