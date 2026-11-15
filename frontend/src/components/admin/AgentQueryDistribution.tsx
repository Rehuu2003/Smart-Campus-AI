import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip as RechartsTooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { MOCK_ADMIN_METRICS } from '@/lib/mockData';
import { Activity, BarChart2, PieChart as PieIcon, Calendar } from 'lucide-react';

export function AgentQueryDistribution() {
  const [timeframe, setTimeframe] = useState<'today' | 'week' | 'month'>('today');

  const distribution = MOCK_ADMIN_METRICS.agentQueryDistribution;
  const hourlyData = MOCK_ADMIN_METRICS.hourlyQueryVolume;

  const totalQueries = distribution.reduce((sum, item) => sum + item.queries, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* Donut Chart: Query Breakdown by Agent (5 cols) */}
      <Card className="lg:col-span-5 border-slate-200/90 shadow-soft-xs flex flex-col">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-purple-600" />
              <CardTitle className="text-sm font-bold text-slate-900">
                Agent Query Distribution
              </CardTitle>
            </div>
            <span className="text-[11px] font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
              Total: {totalQueries.toLocaleString()}
            </span>
          </div>
          <CardDescription className="text-xs text-slate-500">
            Share of autonomous student &amp; faculty requests routed per specialized agent
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4 flex-1 flex flex-col justify-between space-y-4">
          {/* Recharts Donut */}
          <div className="w-full h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value: any, name: any) => [`${value} queries`, name]}
                />
                <Pie
                  data={distribution}
                  dataKey="queries"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                >
                  {distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg font-black text-slate-900 font-mono">
                {totalQueries}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Queries</span>
            </div>
          </div>

          {/* Legend Grid */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
            {distribution.map((agent) => (
              <div
                key={agent.id}
                className="flex items-center justify-between p-1.5 rounded hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: agent.color }}
                  />
                  <span className="text-slate-700 font-medium truncate text-[11px]">
                    {agent.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="text-slate-900 font-bold">{agent.queries}</span>
                  <span className="text-slate-400">({agent.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bar Chart: Hourly Query Volume & Latency Trend (7 cols) */}
      <Card className="lg:col-span-7 border-slate-200/90 shadow-soft-xs flex flex-col">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-blue-600" />
              <CardTitle className="text-sm font-bold text-slate-900">
                Hourly System Inflow &amp; Traffic Volume
              </CardTitle>
            </div>

            {/* Timeframe selector */}
            <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-100 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setTimeframe('today')}
                className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                  timeframe === 'today'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setTimeframe('week')}
                className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                  timeframe === 'week'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                7 Days
              </button>
              <button
                type="button"
                onClick={() => setTimeframe('month')}
                className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                  timeframe === 'month'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Month
              </button>
            </div>
          </div>
          <CardDescription className="text-xs text-slate-500">
            Real-time multi-agent request bursts correlated with lecture periods
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4 flex-1 flex flex-col justify-between">
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="hour"
                  stroke="#94A3B8"
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: '#CBD5E1' }}
                />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: '#CBD5E1' }}
                />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar
                  dataKey="queries"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                  name="Queries"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
              <span>Peak Load: 10:00 AM (320 queries/hr)</span>
            </div>
            <span>Average: 153 queries/hr</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
