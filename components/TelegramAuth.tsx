"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

  return (
    <div className="flex items-center justify-center px-4 py-6 min-h-[calc(100dvh-20px)] bg-gray-50">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-md p-6 space-y-4">
        <h2 className="text-xl font-semibold text-center text-gray-800">
          {isAuthenticated ? "Welcome!" : "Sign In with Telegram"}
        </h2>

        <p className="text-gray-600 text-sm text-center">
          {isAuthenticated
            ? "You're authenticated. Choose an option below:"
            : "Tap the button below to authenticate with your Telegram account."}
        </p>

        {isAuthenticated ? (
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => router.push("/gaming")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium"
            >
              Gaming
            </button>
            <button
              onClick={() => router.push("/tasks")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium"
            >
              Tasks
            </button>
            <button
              onClick={() => router.push("/profile")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm font-medium"
            >
              Profile
            </button>
            <button
              onClick={async () => {
                await fetch("/api/logout", { method: "POST" });
                location.reload();
              }}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={authenticateUser}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium mt-4"
          >
            Authenticate with Telegram
          </button>
        )}
      </div>
    </div>
  );
}
