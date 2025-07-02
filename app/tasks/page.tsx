"use client";

import { useRouter } from "next/navigation";

export default function TasksPage() {
  const router = useRouter();

  const demoTasks = [
    { id: 1, title: "Complete your profile", reward: "5 tokens" },
    { id: 2, title: "Invite a friend", reward: "10 tokens" },
    { id: 3, title: "Daily check-in", reward: "2 tokens" },
    { id: 4, title: "Join Telegram Group", reward: "8 tokens" },
  ];

  return (
    <div className="flex flex-col justify-between min-h-[100dvh] bg-black text-white">
      {/* Page Heading */}
      <div className="px-4 pt-6 pb-3">
        <h2 className="text-xl font-bold">Tasks</h2>
        <p className="text-sm text-gray-400">
          Earn rewards by completing tasks
        </p>
      </div>

      {/* Task List */}
      <div className="px-4 space-y-4 overflow-y-auto pb-20">
        {demoTasks.map((task) => (
          <div
            key={task.id}
            className="bg-zinc-900 rounded-xl p-4 shadow-sm flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-base">{task.title}</h3>
              <p className="text-sm text-gray-400">Reward: {task.reward}</p>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-sm px-3 py-1 rounded-lg">
              Start
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
