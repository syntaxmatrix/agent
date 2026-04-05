"use client";
import React from "react";
import { Bookmark, Clock, Bell } from "lucide-react";

export default function Sidebar({ history }: { history: string[] }) {
  return (
    <aside className="hidden lg:block w-80 min-h-[calc(100vh-4rem)] border-l border-indigo-50 bg-white/50 backdrop-blur-md p-6">
      <div className="space-y-8 sticky top-24">
        {/* Saved Items */}
        <section>
          <h3 className="text-xs tracking-wider text-slate-400 font-bold uppercase mb-4 flex items-center gap-2">
            <Bookmark size={14} /> Saved Items
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 transition-all cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Bookmark size={14} />
              </div>
              <div>
                <p className="font-semibold text-slate-800">UI Design Patterns</p>
                <p className="text-xs text-slate-500 mt-0.5">Saved 2 days ago</p>
              </div>
            </li>
            <li className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 transition-all cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Bookmark size={14} />
              </div>
              <div>
                <p className="font-semibold text-slate-800">React Hooks Guide</p>
                <p className="text-xs text-slate-500 mt-0.5">Saved 1 week ago</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Recent Activity */}
        <section>
          <h3 className="text-xs tracking-wider text-slate-400 font-bold uppercase mb-4 flex items-center gap-2">
            <Clock size={14} /> Recent Activity
          </h3>
          <ul className="space-y-2 text-sm">
            {history.length === 0 ? (
              <li className="text-slate-400 italic px-2 text-xs">No recent searches.</li>
            ) : (
              history.map((item, i) => (
                <li key={i} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 transition-all cursor-pointer">
                  <div className="flex items-center gap-3 w-full">
                    <Clock size={14} className="text-indigo-400 flex-shrink-0" />
                    <span className="text-slate-700 truncate font-medium">{item}</span>
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>

        {/* Notifications */}
        <section>
          <h3 className="text-xs tracking-wider text-slate-400 font-bold uppercase mb-4 flex items-center gap-2">
            <Bell size={14} /> Notifications
          </h3>
          <div className="space-y-3">
            <div className="p-4 bg-white border border-indigo-100 rounded-xl shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 group-hover:w-1.5 transition-all"></div>
              <p className="text-sm font-semibold text-slate-900">System Update</p>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Version 2.0 is now live with enhanced layout and features.</p>
            </div>
            <div className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-300 group-hover:w-1.5 transition-all"></div>
              <p className="text-sm font-semibold text-slate-900">Weekly Summary</p>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">You ran {history.length || 14} searches this week.</p>
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
}