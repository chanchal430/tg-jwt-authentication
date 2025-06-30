import { NextResponse } from "next/server";
import { validateTelegramWebAppData } from "@/utils/telegramAuth";
import { cookies } from "next/headers";
import { encrypt, SESSION_DURATION } from "@/utils/session";

// Reusable helper to save user to DB via your internal API
async function saveUserToDB(user: any) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    console.error("❌ NEXT_PUBLIC_BASE_URL is not defined");
    return;
  }

  try {
    const res = await fetch(`${baseUrl}/api/save-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      console.error("❌ Failed to save user to DB:", await res.text());
    }
  } catch (err) {
    console.error("❌ Error calling /api/save-user:", err);
  }
}

export async function POST(request: Request) {
  const { initData } = await request.json();

  const validationResult = validateTelegramWebAppData(initData);

  if (validationResult.validatedData) {
    console.log("✅ Validation result:", validationResult);

    const user = validationResult.user;

    // ⬇ Save to DB
    await saveUserToDB(user);

    // ⬇ Create JWT session with expiry
    const expires = new Date(Date.now() + SESSION_DURATION);
    const session = await encrypt({ user: { telegramId: user.id }, expires });

    // ⬇ Set cookie
    cookies().set("session", session, {
      expires,
      httpOnly: true,
      path: "/",
    });

    return NextResponse.json({ message: "Authentication successful" });
  } else {
    return NextResponse.json(
      { message: validationResult.message },
      { status: 401 }
    );
  }
}
