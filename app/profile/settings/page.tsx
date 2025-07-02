"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ChevronLeft,
  MoreHorizontal,
  ChevronRight,
  Volume2,
  Smartphone,
} from "lucide-react";

// Example emoji flags and languages
const languages = [
  { name: "English", code: "en", flag: "🇬🇧" },
  { name: "Hindi", code: "hi", flag: "🇮🇳" },
  { name: "Spanish", code: "es", flag: "🇪🇸" },
  { name: "French", code: "fr", flag: "🇫🇷" },
];

export default function SettingsPage() {
  const router = useRouter();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-4">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => router.push("/profile")}
        >
          <ChevronLeft className="w-6 h-6 text-white mr-2" />
          <span className="text-white font-medium">Back</span>
        </div>
        <div className="text-center">
          <h1 className="text-white text-lg font-semibold">Settings</h1>
        </div>
        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
          <MoreHorizontal className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Settings Options */}
      <div className="px-4 space-y-4">
        {/* Language Setting */}
        <div
          className="bg-gray-900 rounded-xl p-4 flex items-center justify-between cursor-pointer"
          onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
        >
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xl mr-4">
              {selectedLanguage.flag}
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">
                {selectedLanguage.name}
              </h3>
              <p className="text-gray-400 text-sm">{selectedLanguage.code}</p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-white" />
        </div>

        {/* Language Dropdown */}
        {showLanguageDropdown && (
          <div className="bg-gray-800 rounded-lg mt-1 overflow-hidden">
            {languages.map((lang) => (
              <div
                key={lang.code}
                className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => {
                  setSelectedLanguage(lang);
                  setShowLanguageDropdown(false);
                }}
              >
                <span className="text-xl mr-3">{lang.flag}</span>
                <span className="text-white">{lang.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Sound Setting */}
        <div className="bg-gray-900 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-4">
              <Volume2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-semibold text-lg">Sound</h3>
          </div>
          <div
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              soundEnabled ? "bg-green-500" : "bg-gray-600"
            }`}
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                soundEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </div>
        </div>

        {/* Vibration Setting */}
        <div className="bg-gray-900 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-4">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-semibold text-lg">Vibration</h3>
          </div>
          <div
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              vibrationEnabled ? "bg-green-500" : "bg-gray-600"
            }`}
            onClick={() => setVibrationEnabled(!vibrationEnabled)}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                vibrationEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </div>
        </div>
      </div>

      <div className="flex-1" />
    </div>
  );
}
