import TelegramAuth from "@/components/TelegramAuth";
import { getSession } from "@/utils/session";

export default async function Home() {
  const session = await getSession();
  const isAuthenticated = session && session.user?.telegramId;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16 bg-gray-100 text-gray-800">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-[#143E34]">
          {isAuthenticated ? `Hi, ${session.user.username}!` : "Welcome!"}
        </h1>

        <p className="text-lg text-gray-600">
          {isAuthenticated
            ? "You're authenticated! Access protected pages below."
            : "Explore the app by signing in below."}
        </p>

        {isAuthenticated && (
          <div className="bg-gray-100 rounded-md text-left text-sm font-mono p-4 overflow-x-auto border">
            <pre>{JSON.stringify(session, null, 2)}</pre>
          </div>
        )}

        <TelegramAuth />
      </div>
    </main>
  );
}
