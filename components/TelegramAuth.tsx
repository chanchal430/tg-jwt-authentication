"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, Wallet, Gift, Target, Coins } from "lucide-react";

export default function TelegramAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const response = await fetch("/api/session");
    if (response.ok) {
      setIsAuthenticated(true);
    }
  };

  const authenticateUser = async () => {
    const WebApp = (await import("@twa-dev/sdk")).default;
    WebApp.ready();
    const initData = WebApp.initData;
    if (initData) {
      try {
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ initData }),
        });

        if (response.ok) {
          setIsAuthenticated(true);
          router.refresh();
        } else {
          console.error("Authentication failed");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        setIsAuthenticated(false);
      }
    }
  };

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col justify-between min-h-[100dvh] bg-gray-50">
      {/* Top content */}
      <div className="flex-1 px-4 py-6">
        <div className="bg-white w-full max-w-sm mx-auto rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-xl font-semibold text-center text-gray-800">
            {isAuthenticated ? "Welcome!" : "Sign In with Telegram"}
          </h2>
          <p className="text-gray-600 text-sm text-center">
            {isAuthenticated
              ? "You're authenticated. Use the nav below to explore."
              : "Tap the button below to authenticate with your Telegram account."}
          </p>

          {!isAuthenticated && (
            <button
              onClick={authenticateUser}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium mt-4"
            >
              Authenticate with Telegram
            </button>
          )}
        </div>
      </div>

      {/* Footer nav bar */}
      {isAuthenticated && (
        <nav className="flex justify-around items-center bg-white border-t shadow-inner py-3 fixed bottom-0 w-full">
          <button
            onClick={() => navigate("/home")}
            className="flex flex-col items-center text-xs text-gray-700"
          >
            <Home size={20} />
            Home
          </button>

          <button
            onClick={() => navigate("/tasks")}
            className="flex flex-col items-center text-xs text-gray-700"
          >
            <Coins size={20} />
            Tokens
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="flex flex-col items-center text-xs text-gray-700"
          >
            <Wallet size={20} />
            Wallet
          </button>
        </nav>
      )}
    </div>
  );
}
