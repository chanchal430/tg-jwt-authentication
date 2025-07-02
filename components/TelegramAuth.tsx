"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, UserCircle2, ListChecks } from "lucide-react";

export default function TelegramAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Ensure WebApp is expanded to full height and styled
    const WebApp = window.Telegram?.WebApp;
    if (WebApp) {
      WebApp.expand();
      WebApp.setBackgroundColor("#ffffff");
    }

    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/session");
      if (response.ok) setIsAuthenticated(true);
    } catch (error) {
      console.error("Session check failed:", error);
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
          headers: { "Content-Type": "application/json" },
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
    <div className="flex flex-col justify-between min-h-[100dvh] bg-gradient-to-br from-[#e8f0ff] to-[#ffffff]">
      {/* Top content */}
      <div className="flex-1 flex items-center justify-center px-4 pt-12 pb-24">
        <div className="backdrop-blur-md bg-white/60 border border-gray-200 shadow-xl rounded-2xl w-full max-w-md p-6 space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            {isAuthenticated ? "Welcome!" : "Sign In with Telegram"}
          </h2>
          <p className="text-sm text-gray-600 text-center">
            {isAuthenticated
              ? "You're successfully authenticated. Use the nav below to explore the app."
              : "Tap the button below to authenticate with your Telegram account and continue."}
          </p>

          {!isAuthenticated && (
            <button
              onClick={authenticateUser}
              className="w-full bg-[#0088cc] hover:bg-[#0077b3] text-white py-2 rounded-xl text-sm font-semibold transition-colors"
            >
              Authenticate with Telegram
            </button>
          )}
        </div>
      </div>

      {/* Footer Nav */}
      {isAuthenticated && (
        <nav className="fixed bottom-0 inset-x-0 w-full bg-white border-t shadow-lg py-3 px-6 flex justify-around items-center z-50 max-w-md mx-auto">
          <button
            onClick={() => navigate("/home")}
            className="flex flex-col items-center text-xs text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Home size={22} />
            <span className="mt-1">Home</span>
          </button>

          <button
            onClick={() => navigate("/tasks")}
            className="flex flex-col items-center text-xs text-gray-700 hover:text-blue-600 transition-colors"
          >
            <ListChecks size={22} />
            <span className="mt-1">Tasks</span>
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="flex flex-col items-center text-xs text-gray-700 hover:text-blue-600 transition-colors"
          >
            <UserCircle2 size={22} />
            <span className="mt-1">Profile</span>
          </button>
        </nav>
      )}
    </div>
  );
}
