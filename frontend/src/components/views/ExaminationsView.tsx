import React from 'react';
import { 
  Award, 
  Calendar, 
  MapPin, 
  Clock, 
  Download, 
  ShieldCheck, 
  FileCheck2, 
  TrendingUp,
  QrCode
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_STUDENT_DATA } from '@/lib/mockData';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { playClickTick } from '@/lib/soundEffects';
import { toast } from 'sonner';

export function ExaminationsView() {
  const { exams, gpaHistory } = MOCK_STUDENT_DATA;

  const handleDownloadTicket = (courseCode: string) => {
    playClickTick();
    toast.success(`Official Hall Ticket & Seat Verification Slip for ${courseCode} downloaded!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Executive Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-cyan-800 via-teal-900 to-slate-900 p-6 sm:p-8 text-white shadow-soft-md overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Office of the Controller of Examinations
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Examinations &amp; Academic Records
          </h1>

          <p className="text-cyan-100 text-xs sm:text-sm leading-relaxed">
            Official schedules, hall tickets, allocated seating coordinates, and cumulative GPA records for {MOCK_STUDENT_DATA.profile.name}.
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5 text-[11px] font-mono">
            <span className="bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-500/30 text-cyan-200 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-cyan-300" />
              Cumulative CGPA: {MOCK_STUDENT_DATA.profile.cgpa} / 4.0
            </span>
            <span className="bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-500/30 text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Attendance Eligible for End-Terms (&gt;75%)
            </span>
          </div>
        </div>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200/90 shadow-soft-xs">
          <CardHeader className="pb-1">
            <span className="text-xs text-slate-500 font-semibold uppercase">Current CGPA</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              3.84 / 4.0
            </div>
            <span className="text-xs text-emerald-600 font-bold">● Top 8% of CS-A</span>
          </CardContent>
        </Card>

        <Card className="border-slate-200/90 shadow-soft-xs">
          <CardHeader className="pb-1">
            <span className="text-xs text-slate-500 font-semibold uppercase">Upcoming Papers</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              2 Midterms
            </div>
            <span className="text-xs text-cyan-600 font-bold">● Starts Dec 02, 2026</span>
          </CardContent>
        </Card>

        <Card className="border-slate-200/90 shadow-soft-xs">
          <CardHeader className="pb-1">
            <span className="text-xs text-slate-500 font-semibold uppercase">Hall Ticket Status</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              Issued &amp; Active
            </div>
            <span className="text-xs text-emerald-600 font-bold">● QR Signed by Registrar</span>
          </CardContent>
        </Card>

        <Card className="border-slate-200/90 shadow-soft-xs">
          <CardHeader className="pb-1">
            <span className="text-xs text-slate-500 font-semibold uppercase">Completed Credits</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              88 / 120
            </div>
            <span className="text-xs text-blue-600 font-bold">● On Track for Graduation</span>
          </CardContent>
        </Card>
      </div>

      {/* Exam Timetable Cards */}
      <Card className="border-slate-200/90 shadow-soft-xs overflow-hidden">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-sm font-bold text-slate-900">
              Semester 5 Midterm Schedule &amp; Seating Allocations
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Bring your student RFID badge and digital hall ticket to all venues
            </CardDescription>
          </div>
          <Badge variant="agent" agentId="exam">
            Controller Verified
          </Badge>
        </CardHeader>

        <CardContent className="p-4 sm:p-5 space-y-3">
          {exams.map((ex) => (
            <div
              key={ex.id}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-cyan-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-cyan-900 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                    {ex.courseCode}
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {ex.courseName}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-slate-100 text-slate-700">
                    {ex.examType}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {ex.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {ex.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {ex.venue}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">Assigned Seat</span>
                  <span className="font-mono font-bold text-xs text-cyan-800 bg-cyan-50 px-2.5 py-1 rounded-lg border border-cyan-200">
                    Seat #{ex.seatNumber}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleDownloadTicket(ex.courseCode)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-cyan-700 hover:bg-cyan-800 rounded-xl shadow-2xs transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Hall Ticket</span>
                </button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* GPA Progression Timeseries Chart */}
      <Card className="border-slate-200/90 shadow-soft-xs">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-600" />
              <CardTitle className="text-sm font-bold text-slate-900">
                Cumulative Grade Point Average (CGPA) Trajectory
              </CardTitle>
            </div>
            <span className="text-[11px] font-mono font-bold text-emerald-600">
              Consistently &gt; 3.70
            </span>
          </div>
          <CardDescription className="text-xs text-slate-500">
            Historical academic standing from Semester 1 through Semester 5
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="w-full h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={gpaHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="semester" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis domain={[3.0, 4.0]} stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(val: any) => [`${val} / 4.0`, 'GPA']}
                />
                <Area
                  type="monotone"
                  dataKey="gpa"
                  stroke="#06B6D4"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorGpa)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
