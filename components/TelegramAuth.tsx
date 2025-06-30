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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {isAuthenticated ? "Welcome!" : "Authenticate to Continue"}
        </h2>

        {isAuthenticated ? (
          <>
            <p className="text-gray-600 text-sm">
              You’re authenticated! Access the app below.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => router.push("/gaming")}
                className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-xl transition-all"
              >
                Gaming
              </button>

              <button
                onClick={() => router.push("/tasks")}
                className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-xl transition-all"
              >
                Tasks
              </button>

              <button
                onClick={() => router.push("/profile")}
                className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-xl transition-all"
              >
                Profile
              </button>

              <button
                onClick={async () => {
                  await fetch("/api/logout", { method: "POST" });
                  location.reload();
                }}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl transition-all"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-600 text-sm">
              You need to be the owner of this Telegram account to access the
              app.
            </p>
            <button
              onClick={authenticateUser}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition-all"
            >
              Authenticate with Telegram
            </button>
          </>
        )}
      </div>
    </div>
  );
}
