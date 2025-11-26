import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Zap, TrendingUp, Calendar } from "lucide-react";

const weeklyData = [
  { name: "Mon", hours: 3.5, users: 120 },
  { name: "Tue", hours: 5.2, users: 132 },
  { name: "Wed", hours: 4.8, users: 101 },
  { name: "Thu", hours: 6.5, users: 154 },
  { name: "Fri", hours: 5.1, users: 140 },
  { name: "Sat", hours: 2.2, users: 80 },
  { name: "Sun", hours: 1.5, users: 60 },
];

const categoryData = [
  { name: "Coding", value: 65, color: "#0F62FE" },
  { name: "Writing", value: 20, color: "#393939" },
  { name: "Learning", value: 15, color: "#8D8D8D" },
];

const AnalyticsDemo = () => {
  return (
    <div className="bg-neutral-50 py-24 sm:py-32 overflow-hidden" id="analytics">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 mb-16 lg:mb-0">
            <h2 className="text-base font-semibold leading-7 text-primary">Data Intelligence</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              Precision Analytics
            </p>
            <p className="mt-6 text-lg leading-8 text-neutral-600">
              Stop guessing. Pulseboard Pro transforms your work patterns into actionable insights.
              Visualize your velocity, identify bottlenecks, and optimize your deep work capability.
            </p>
            <div className="mt-10 space-y-6">
              <div className="flex gap-4">
                <div className="flex-none flex items-center justify-center w-10 h-10 bg-primary/10 rounded-sm">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Velocity Tracking</h3>
                  <p className="text-sm text-neutral-600">Monitor your daily output trend.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-none flex items-center justify-center w-10 h-10 bg-primary/10 rounded-sm">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Focus Score</h3>
                  <p className="text-sm text-neutral-600">
                    Algorithmic quality rating of your sessions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative bg-dark rounded-sm shadow-2xl p-6 sm:p-8 border border-neutral-800">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-primary text-white text-xs font-bold px-3 py-1 shadow-lg">
                PRO DASHBOARD
              </div>

              <div className="flex justify-between items-end mb-8 border-b border-neutral-800 pb-4">
                <div>
                  <p className="text-neutral-400 text-sm uppercase tracking-wider">
                    Weekly Overview
                  </p>
                  <h3 className="text-2xl font-bold text-white mt-1">October 22 - 28</h3>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-3xl font-bold text-white">28.8h</p>
                  <p className="text-neutral-500 text-xs">Total Deep Work</p>
                </div>
              </div>

              <div className="h-64 w-full mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData}>
                    <defs>
                      <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0F62FE" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0F62FE" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis
                      dataKey="name"
                      stroke="#666"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#262626",
                        border: "none",
                        color: "#fff",
                      }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="hours"
                      stroke="#0F62FE"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorHours)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-dark-surface p-4 rounded-sm border border-neutral-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-neutral-400 text-xs uppercase">Top Category</span>
                    <span className="text-primary text-xs">65%</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-white font-bold text-lg">Coding</span>
                    <div className="flex gap-1 h-3">
                      {categoryData.map((cat, i) => (
                        <div
                          key={i}
                          style={{
                            width: `${cat.value}px`,
                            backgroundColor: cat.color,
                          }}
                          className="h-full rounded-sm"
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-dark-surface p-4 rounded-sm border border-neutral-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-neutral-400 text-xs uppercase">Current Streak</span>
                    <Calendar className="w-3 h-3 text-neutral-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-2xl">12</span>
                    <span className="text-neutral-500 text-sm">Days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDemo;
