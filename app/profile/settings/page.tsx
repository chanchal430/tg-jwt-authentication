"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ChevronLeft,
  MoreHorizontal,
  ChevronRight,
  Volume2,
  Smartphone,
} from "lucide-react";

// Use local flag image paths
const languages = [
  {
    name: "English",
    code: "English",
    flagUrl: "/flags/gb.png",
  },
  {
    name: "Hindi",
    code: "Hindi",
    flagUrl: "/flags/in.png",
  },
  {
    name: "Spanish",
    code: "Spanish",
    flagUrl: "/flags/es.png",
  },
  {
    name: "French",
    code: "French",
    flagUrl: "/flags/fr.png",
  },
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
          onClick={() => router.back()}
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
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={selectedLanguage.flagUrl}
                alt={`${selectedLanguage.name} flag`}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-medium text-base">
                {selectedLanguage.name}
              </span>
              <span className="text-sm text-gray-400">
                {selectedLanguage.name}
              </span>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-white" />
        </div>

        {/* Language Dropdown */}
        {showLanguageDropdown && (
          <div className="bg-gray-800 rounded-xl mt-2 overflow-hidden divide-y divide-gray-700">
            {languages.map((lang) => (
              <div
                key={lang.code}
                className="flex items-center px-4 py-3 hover:bg-gray-700 cursor-pointer transition-all"
                onClick={() => {
                  setSelectedLanguage(lang);
                  setShowLanguageDropdown(false);
                }}
              >
                <Image
                  src={lang.flagUrl}
                  alt={`${lang.name} flag`}
                  width={24}
                  height={24}
                  className="rounded-full mr-3"
                />
                <span className="text-white text-sm">{lang.name}</span>
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
