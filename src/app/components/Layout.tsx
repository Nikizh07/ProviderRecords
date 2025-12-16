import { Link, useLocation } from "react-router";
import { Home, Upload, FileText, AlertCircle, BarChart3, BrainCircuit } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/upload", label: "Upload & Verify", icon: Upload },
    { path: "/providers", label: "Provider Directory", icon: FileText },
    { path: "/review-queue", label: "Review Queue", icon: AlertCircle },
    { path: "/reports", label: "Reports & Export", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-teal-500 to-blue-600 p-2 rounded-lg">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-slate-900">Provider Directory AI</h1>
                <p className="text-sm text-slate-500">Automated Provider Data Verification</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-600">Healthcare Payer Inc.</p>
                <p className="text-xs text-slate-400">Admin User</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="px-6">
          <div className="flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                    isActive
                      ? "border-teal-600 text-teal-700"
                      : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-6 py-8">
        {children}
      </main>
    </div>
  );
}
