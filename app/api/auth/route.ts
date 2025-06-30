import { NextResponse } from "next/server";
import { validateTelegramWebAppData } from "@/utils/telegramAuth";
import { cookies } from "next/headers";
import { encrypt, SESSION_DURATION } from "@/utils/session";

export async function POST(request: Request) {
  const { initData } = await request.json();

  const validationResult = validateTelegramWebAppData(initData);

  if (validationResult.validatedData) {
    console.log("Validation result: ", validationResult);
    const user = validationResult.user;

    // 🔥 Save user to database
    try {
      // await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/save-user`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(user),
      // })
      await fetch("/api/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
    } catch (err) {
      console.error("Failed to save user in DB:", err);
    }

    // ✅ Create a new session
    const expires = new Date(Date.now() + SESSION_DURATION);
    const session = await encrypt({ user: { telegramId: user.id }, expires });

    // ✅ Save session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });

    return NextResponse.json({ message: "Authentication successful" });
  } else {
    return NextResponse.json(
      { message: validationResult.message },
      { status: 401 }
    );
  }
}
