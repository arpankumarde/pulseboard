import React, { useState } from "react";
import { Plus, Clock, Calendar, Zap, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface Session {
  id: string;
  title: string;
  category: string;
  duration: number;
  date: string;
}

const DashboardHome = () => {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      title: "Refactor Auth Component",
      category: "Coding",
      duration: 45,
      date: "Today, 10:30 AM",
    },
    {
      id: "2",
      title: "Write Weekly Update",
      category: "Writing",
      duration: 30,
      date: "Today, 09:15 AM",
    },
    {
      id: "3",
      title: "System Design Course",
      category: "Learning",
      duration: 60,
      date: "Yesterday",
    },
  ]);

  const [newSession, setNewSession] = useState({
    title: "",
    category: "Coding",
    duration: "",
  });

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSession.title || !newSession.duration) return;

    const session: Session = {
      id: Date.now().toString(),
      title: newSession.title,
      category: newSession.category,
      duration: parseInt(newSession.duration),
      date: "Just now",
    };

    setSessions([session, ...sessions]);
    setNewSession({ title: "", category: "Coding", duration: "" });
    setIsFormOpen(false);
  };

  const deleteSession = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  const totalMinutesToday = sessions
    .filter((s) => s.date.includes("Today") || s.date.includes("Just now"))
    .reduce((acc, curr) => acc + curr.duration, 0);

  const hours = Math.floor(totalMinutesToday / 60);
  const minutes = totalMinutesToday % 60;

  return (
    <div className="space-y-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-neutral-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Dashboard
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <Button onClick={() => setIsFormOpen(!isFormOpen)}>
            <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Log Session
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-neutral-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="shrink-0">
                <Clock className="h-6 w-6 text-neutral-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-neutral-500">Today's Focus</dt>
                  <dd>
                    <div className="text-lg font-medium text-neutral-900">
                      {hours}h {minutes}m
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-neutral-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="shrink-0">
                <Zap className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-neutral-500">Current Streak</dt>
                  <dd>
                    <div className="text-lg font-medium text-neutral-900">4 Days</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-neutral-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="shrink-0">
                <Calendar className="h-6 w-6 text-neutral-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-neutral-500">Total Sessions</dt>
                  <dd>
                    <div className="text-lg font-medium text-neutral-900">{sessions.length}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isFormOpen && (
        <div className="bg-white p-6 rounded-sm shadow-sm ring-1 ring-neutral-200">
          <h3 className="text-lg font-medium leading-6 text-neutral-900 mb-4">Log a new session</h3>
          <form
            onSubmit={handleAddSession}
            className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6"
          >
            <div className="sm:col-span-3">
              <Label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-neutral-900"
              >
                Title
              </Label>
              <div className="mt-2">
                <Input
                  type="text"
                  name="title"
                  id="title"
                  value={newSession.title}
                  onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                  className="block w-full rounded-sm border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  placeholder="What did you work on?"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <Label
                htmlFor="duration"
                className="block text-sm font-medium leading-6 text-neutral-900"
              >
                Minutes
              </Label>
              <div className="mt-2">
                <Input
                  type="number"
                  name="duration"
                  id="duration"
                  value={newSession.duration}
                  onChange={(e) => setNewSession({ ...newSession, duration: e.target.value })}
                  className="block w-full rounded-sm border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  placeholder="45"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <Label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-neutral-900"
              >
                Category
              </Label>
              <div className="mt-2">
                <select
                  id="category"
                  name="category"
                  required
                  value={newSession.category}
                  onChange={(e) => setNewSession({ ...newSession, category: e.target.value })}
                  className="block w-full rounded-sm border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                >
                  <option>Coding</option>
                  <option>Writing</option>
                  <option>Learning</option>
                  <option>Meeting</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-6 flex justify-end gap-x-3">
              <Button type="button" variant="ghost" onClick={() => setIsFormOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Log</Button>
            </div>
          </form>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white shadow-sm ring-1 ring-neutral-200 sm:rounded-sm">
        <div className="border-b border-neutral-200 px-4 py-5 sm:px-6">
          <h3 className="text-base font-semibold leading-6 text-neutral-900">Recent Activity</h3>
        </div>
        <ul role="list" className="divide-y divide-neutral-200">
          {sessions.length === 0 ? (
            <li className="px-4 py-5 sm:px-6 text-center text-neutral-500">
              No sessions logged yet.
            </li>
          ) : (
            sessions.map((session) => (
              <li
                key={session.id}
                className="px-4 py-4 sm:px-6 hover:bg-neutral-50 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        session.category === "Coding"
                          ? "bg-blue-500"
                          : session.category === "Writing"
                          ? "bg-purple-500"
                          : session.category === "Learning"
                          ? "bg-yellow-500"
                          : "bg-neutral-500"
                      }`}
                    />
                    <div className="truncate">
                      <p className="truncate text-sm font-medium text-primary">{session.title}</p>
                      <p className="mt-1 flex items-center text-xs text-neutral-500">
                        <span className="truncate">{session.category}</span>
                        <span className="mx-1">&middot;</span>
                        <span className="truncate">{session.date}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-neutral-900 font-semibold">
                      {session.duration}m
                    </div>
                    <button
                      onClick={() => deleteSession(session.id)}
                      className="text-neutral-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;
