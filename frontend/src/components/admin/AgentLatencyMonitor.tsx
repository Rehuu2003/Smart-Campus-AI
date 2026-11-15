import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend 
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { MOCK_ADMIN_METRICS } from '@/lib/mockData';
import { Activity, Zap, Cpu, Server, CheckCircle2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export function AgentLatencyMonitor() {
  const [nodes, setNodes] = useState(MOCK_ADMIN_METRICS.agentNodes);
  const [isPinging, setIsPinging] = useState<string | null>(null);

  const latencyHistory = MOCK_ADMIN_METRICS.latencyHistory;

  const handlePingNode = async (nodeId: string, nodeName: string) => {
    setIsPinging(nodeId);
    const simulatedLatency = Math.floor(Math.random() * 12) + 12; // 12ms to 24ms
    await new Promise((r) => setTimeout(r, 450));
    setIsPinging(null);

    toast.success(`Heartbeat verified for ${nodeName}: Ack received in ${simulatedLatency}ms (Zero packet loss)`);
  };

  return (
    <div className="space-y-5">
      {/* Latency History Timeseries Area Chart */}
      <Card className="border-slate-200/90 shadow-soft-xs">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <CardTitle className="text-sm font-bold text-slate-900">
                End-to-End Agent Response Latency (P50 / P95 / P99)
              </CardTitle>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Global P95: 24ms
              </span>
              <span>Target SLO: &lt;100ms</span>
            </div>
          </div>
          <CardDescription className="text-xs text-slate-500">
            Real-time latency percentiles measured across coordinator routing, database lookups &amp; Gemini token generation
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="w-full h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={latencyHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorP99" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F43F5E" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorP95" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorP50" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="time"
                  stroke="#94A3B8"
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: '#CBD5E1' }}
                />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={10}
                  unit="ms"
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
                  formatter={(val: any, name: any) => [`${val} ms`, name]}
                />
                <Area
                  type="monotone"
                  dataKey="p99"
                  stroke="#F43F5E"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorP99)"
                  name="P99 Latency"
                />
                <Area
                  type="monotone"
                  dataKey="p95"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorP95)"
                  name="P95 Latency"
                />
                <Area
                  type="monotone"
                  dataKey="p50"
                  stroke="#10B981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorP50)"
                  name="P50 Latency"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Live Agent Telemetry Nodes Table */}
      <Card className="border-slate-200/90 shadow-soft-xs overflow-hidden">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-blue-600" />
              <CardTitle className="text-sm font-bold text-slate-900">
                Autonomous Agent Node Telemetry &amp; Resource Footprint
              </CardTitle>
            </div>
            <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              7 / 7 Active Nodes
            </span>
          </div>
          <CardDescription className="text-xs text-slate-500">
            Microservice health, active memory allocations, CPU load &amp; heartbeat verification
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Node Name &amp; ID</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">P95 Latency</th>
                  <th className="py-2.5 px-3">CPU Load</th>
                  <th className="py-2.5 px-3">Memory</th>
                  <th className="py-2.5 px-3">RPS</th>
                  <th className="py-2.5 px-3">Uptime</th>
                  <th className="py-2.5 px-3 text-right">Heartbeat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {nodes.map((node) => {
                  const isBusy = isPinging === node.id;
                  return (
                    <tr key={node.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-slate-900">{node.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{node.id}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {node.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-800">
                        {node.p95Latency}ms
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-700">
                        {node.cpuPercent}%
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-700">
                        {node.memoryMb} MB
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-700">
                        {node.requestsSec} req/s
                      </td>
                      <td className="py-2.5 px-3 font-mono text-emerald-700 font-bold">
                        {node.uptime}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => handlePingNode(node.id, node.name)}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded border border-blue-200 transition cursor-pointer disabled:opacity-50"
                        >
                          <RefreshCw className={`w-3 h-3 ${isBusy ? 'animate-spin' : ''}`} />
                          <span>{isBusy ? 'Pinging...' : 'Ping'}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
