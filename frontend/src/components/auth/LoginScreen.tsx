import { useState, FormEvent } from 'react';
import { 
  GraduationCap, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  BookOpen, 
  Building2 
} from 'lucide-react';
import { useAuthStore, DEMO_USERS } from '@/stores/authStore';
import { UserRole } from '@/types/auth';
import { Button } from '@/components/ui/Button';
import { AGENT_REGISTRY } from '@/types/agent';

export function LoginScreen() {
  const { login, demoLogin, isLoading } = useAuthStore();
  
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState(DEMO_USERS.student.email);
  const [password, setPassword] = useState('campus@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(DEMO_USERS[role].email);
    setPassword('campus@2026');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(email, selectedRole);
  };

  const rolePills: { role: UserRole; label: string; icon: any; desc: string }[] = [
    { role: 'student', label: 'Student', icon: Users, desc: 'View attendance, fees, courses & tasks' },
    { role: 'faculty', label: 'Faculty', icon: BookOpen, desc: 'Manage class attendance & assignments' },
    { role: 'admin', label: 'Administrator', icon: Building2, desc: 'Agent health, logs & institutional analytics' },
  ];

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans selection:bg-blue-500/20 selection:text-blue-200">
      <div className="w-full max-w-5xl rounded-3xl border border-slate-800 bg-[#0F172A] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* Left Column: Brand & Multi-Agent Showcase */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#1E3A8A] via-[#172554] to-[#0F172A] p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 relative overflow-hidden">
          {/* Subtle Glow Backdrop */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand */}
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-soft-sm">
                <GraduationCap className="w-6 h-6 text-blue-200" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white block">
                  Smart Campus AI
                </span>
                <span className="text-[11px] font-mono font-medium text-blue-200">
                  Enterprise Academic OS
                </span>
              </div>
            </div>

            <div className="pt-4">
              <h2 className="text-2xl font-extrabold text-white leading-tight">
                Unified Multi-Agent Academic Intelligence
              </h2>
              <p className="text-blue-100/80 text-xs sm:text-sm mt-2 leading-relaxed">
                Empowering students, faculty, and administrators with specialized AI agents for attendance cutoffs, financial ledgers, timetables, and submissions.
              </p>
            </div>
          </div>

          {/* Multi-Agent Live Fleet Indicators */}
          <div className="relative z-10 my-8 p-4 rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-md space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Active Agent Mesh
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">7 Nodes Ready</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-medium">
              {Object.values(AGENT_REGISTRY).slice(0, 4).map((agent) => (
                <div key={agent.id} className="flex items-center gap-2 text-slate-300">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: agent.color }} />
                  <span className="truncate">{agent.shortName}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Security Assurance */}
          <div className="relative z-10 flex items-center gap-2 text-[11px] text-blue-200/70 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Role-Based Access Control & Single Sign-On</span>
          </div>
        </div>

        {/* Right Column: Authentication Card & Role Selector */}
        <div className="lg:col-span-7 bg-white text-slate-900 p-8 lg:p-12 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Sign in to your portal
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-full">
                  Demo Sandbox
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Select your institutional role to automatically load demo credentials.
              </p>
            </div>

            {/* Role Switcher Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
              {rolePills.map((pill) => {
                const Icon = pill.icon;
                const isSelected = selectedRole === pill.role;
                return (
                  <button
                    key={pill.role}
                    type="button"
                    onClick={() => handleRoleSelect(pill.role)}
                    className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-white text-[#1E3A8A] font-bold shadow-soft-xs border border-slate-200/80 scale-[1.02]' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 font-medium'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-1 ${isSelected ? 'text-[#1E3A8A]' : 'text-slate-500'}`} />
                    <span className="text-xs">{pill.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Demo Profile Card */}
            <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 font-mono">
                  Active Demo Profile
                </span>
                <div className="font-bold text-slate-900 text-sm mt-0.5">
                  {DEMO_USERS[selectedRole].name}
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  ID: {DEMO_USERS[selectedRole].identifier} · {DEMO_USERS[selectedRole].department}
                </div>
              </div>
              <button
                type="button"
                onClick={() => demoLogin(selectedRole)}
                className="text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#172554] px-3 py-1.5 rounded-lg shadow-soft-xs transition flex items-center gap-1 cursor-pointer shrink-0"
              >
                <span>Instant In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Institutional Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@campus.edu"
                    className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent bg-slate-50/50 shadow-soft-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">Password</label>
                  <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] text-blue-700 hover:underline font-semibold">
                    Reset key?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full text-xs pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent bg-slate-50/50 shadow-soft-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-[#1E3A8A] focus:ring-[#1E3A8A]"
                  />
                  <span>Remember this terminal</span>
                </label>
                <span className="text-[11px] text-slate-400 font-mono">TLS 1.3 Encrypted</span>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isLoading}
                className="w-full bg-[#1E3A8A] hover:bg-[#172554] shadow-soft-sm py-2.5 text-xs font-bold"
              >
                <span>Authenticate as {DEMO_USERS[selectedRole].name}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </form>

          </div>

          {/* Footer Notes */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Smart Campus AI v2.4</span>
            <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Institutional Identity Service Ready
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
