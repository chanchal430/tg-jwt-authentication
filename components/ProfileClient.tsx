"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  MoreHorizontal,
  X,
  ChevronRight,
  Settings,
} from "lucide-react";

export default function ProfileClient({ firstName }: { firstName: string }) {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-4">
        <div className="flex items-center" onClick={() => router.back()}>
          <ChevronLeft className="w-6 h-6 text-white mr-2" />
          <span className="text-white font-medium">Back</span>
        </div>
        <div className="text-center">
          <h1 className="text-white text-lg font-semibold">Profile</h1>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-4">
            <MoreHorizontal className="w-4 h-4 text-white" />
          </div>
          <X className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Character Section */}
      <div className="flex flex-col items-center mt-8 mb-8">
        <div className="flex items-center">
          <h2 className="text-white text-3xl font-bold mr-2">{firstName}</h2>
        </div>
      </div>

      {/* Menu Options */}
      <div className="px-4 space-y-4">
        <Link
          href="/profile/settings"
          className="bg-gray-900 rounded-xl p-4 flex items-center justify-between"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-4">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Settings</h3>
              <p className="text-gray-400 text-sm">
                Language, music, sounds and vibration
              </p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-white" />
        </Link>
      </div>

      <div className="flex-1" />
    </div>
  );
}
