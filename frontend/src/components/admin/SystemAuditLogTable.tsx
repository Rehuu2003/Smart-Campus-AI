import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  Filter, 
  ShieldCheck, 
  AlertTriangle, 
  AlertCircle, 
  Clock, 
  UserCheck, 
  FileSpreadsheet
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { MOCK_ADMIN_METRICS } from '@/lib/mockData';
import { toast } from 'sonner';

export function SystemAuditLogTable() {
  const [logs, setLogs] = useState(MOCK_ADMIN_METRICS.auditLogs);
  const [severityFilter, setSeverityFilter] = useState<'ALL' | 'INFO' | 'WARN' | 'CRITICAL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering
  const filteredLogs = logs.filter((log) => {
    const matchesSeverity = severityFilter === 'ALL' || log.severity === severityFilter;
    const matchesSearch =
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.agent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.traceId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Log ID', 'Timestamp', 'Trace ID', 'Actor', 'Agent', 'Action', 'Severity', 'Status', 'Execution Time'];
    const rows = filteredLogs.map((l) => [
      l.id,
      l.timestamp,
      l.traceId,
      `"${l.actor}"`,
      `"${l.agent}"`,
      `"${l.action}"`,
      l.severity,
      l.status,
      `${l.executionMs}ms`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `system-audit-log-${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success('System transaction audit log exported to CSV!');
  };

  return (
    <Card className="border-slate-200/90 shadow-soft-xs overflow-hidden">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <CardTitle className="text-sm font-bold text-slate-900">
                System Transaction Audit Trail &amp; Access Log
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-500 mt-0.5">
              Immutable ledger of agent queries, security edge evaluations &amp; institutional actions
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 transition cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
          {/* Severity Segmented Buttons */}
          <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-100 text-[11px] font-semibold w-full sm:w-auto">
            {(['ALL', 'INFO', 'WARN', 'CRITICAL'] as const).map((sev) => (
              <button
                key={sev}
                type="button"
                onClick={() => setSeverityFilter(sev)}
                className={`flex-1 sm:flex-initial px-3 py-1 rounded-md transition cursor-pointer ${
                  severityFilter === sev
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {sev === 'ALL' ? 'All Events' : sev}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search trace, actor, or action..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs p-2 pl-8 rounded-lg border border-slate-200 bg-white text-slate-800"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Timestamp / Trace</th>
                <th className="py-2.5 px-3">Actor</th>
                <th className="py-2.5 px-3">Agent</th>
                <th className="py-2.5 px-3">Action Description</th>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Latency</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => {
                const isCritical = log.severity === 'CRITICAL';
                const isWarn = log.severity === 'WARN';
                return (
                  <tr key={log.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <div className="font-mono text-slate-900 font-semibold text-[11px]">
                        {log.timestamp}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {log.traceId}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-800 whitespace-nowrap">
                      {log.actor}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-700 whitespace-nowrap">
                      {log.agent}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 max-w-xs sm:max-w-md">
                      {log.action}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          isCritical
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : isWarn
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        {log.severity}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                      {log.executionMs}ms
                    </td>
                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <span
                        className={`font-mono text-[11px] font-semibold ${
                          log.status === 'Success'
                            ? 'text-emerald-600'
                            : log.status === 'Throttled'
                            ? 'text-rose-600'
                            : 'text-blue-600'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
