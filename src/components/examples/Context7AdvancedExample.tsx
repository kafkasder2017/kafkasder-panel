"use client";

// Advanced TypeScript Types
// ID pattern: e.g. user-123, org-456
export type Id<TPrefix extends string = string, TId extends string = string> = `${TPrefix}-${TId}`;
// Path pattern: e.g. /users/123
export type PathPattern = `/${string}`;

import React from "react";

// Example data
const userId: Id<"user", "123"> = "user-123";
const orgId: Id<"org", "456"> = "org-456";
const validPath: PathPattern = "/dashboard/settings";
// const invalidPath: PathPattern = "dashboard"; // Type error

export default function Context7AdvancedExample() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-slate-50 to-slate-200 p-8">
      <div className="max-w-md w-full rounded-2xl shadow-xl bg-white p-8 border border-slate-100">
        <h2 className="text-2xl font-bold mb-2 text-slate-900">Context7 Advanced Example</h2>
        <p className="text-slate-600 mb-4">
          <span className="font-semibold">TypeScript:</span> Template literal types for <code>Id</code> and <code>PathPattern</code>.<br/>
          <span className="font-semibold">Tailwind CSS:</span> Modern card & button with responsive and interactive states.
        </p>
        <div className="mb-4">
          <div className="mb-2 text-sm text-slate-700">Sample IDs:</div>
          <div className="flex gap-2">
            <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-mono text-xs">{userId}</span>
            <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">{orgId}</span>
          </div>
        </div>
        <div className="mb-6">
          <div className="mb-2 text-sm text-slate-700">Sample Path:</div>
          <span className="px-2 py-1 rounded bg-slate-100 text-slate-700 font-mono text-xs">{validPath}</span>
        </div>
        <button
          className="w-full rounded-lg px-4 py-2 font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 shadow hover:from-purple-600 hover:to-indigo-600 active:scale-95 transition-all duration-150"
          onClick={() => alert("Context7 Advanced Example!")}
        >
          Context7 Action
        </button>
      </div>
    </div>
  );
} 