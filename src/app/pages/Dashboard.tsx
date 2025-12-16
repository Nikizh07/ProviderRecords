import { Layout } from "../components/Layout";
import { CheckCircle2, AlertTriangle, TrendingUp, Activity } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { dashboardStats, verificationTrend, confidenceDistribution } from "../data/mockData";

export function Dashboard() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <h2 className="text-slate-900 mb-1">Dashboard</h2>
          <p className="text-slate-600">Overview of provider data verification status</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs text-slate-500">Total</span>
            </div>
            <div>
              <p className="text-3xl text-slate-900 mb-1">{dashboardStats.totalProviders.toLocaleString()}</p>
              <p className="text-sm text-slate-500">Total Providers</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">+2.3%</span>
            </div>
            <div>
              <p className="text-3xl text-slate-900 mb-1">{dashboardStats.verifiedPercentage}%</p>
              <p className="text-sm text-slate-500">Verified</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-amber-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">-1.2%</span>
            </div>
            <div>
              <p className="text-3xl text-slate-900 mb-1">{dashboardStats.needsReviewCount.toLocaleString()}</p>
              <p className="text-sm text-slate-500">Needs Review</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-teal-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-teal-600" />
              </div>
              <span className="text-xs text-slate-500">Avg.</span>
            </div>
            <div>
              <p className="text-3xl text-slate-900 mb-1">{dashboardStats.averageConfidenceScore}%</p>
              <p className="text-sm text-slate-500">Confidence Score</p>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Verification Trend */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="mb-6">
              <h3 className="text-slate-900 mb-1">Verification Trend</h3>
              <p className="text-sm text-slate-500">Monthly verification progress over time</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={verificationTrend}>
                <defs>
                  <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNeedsReview" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="verified" 
                  stroke="#14b8a6" 
                  fillOpacity={1} 
                  fill="url(#colorVerified)" 
                  name="Verified %"
                />
                <Area 
                  type="monotone" 
                  dataKey="needsReview" 
                  stroke="#f59e0b" 
                  fillOpacity={1} 
                  fill="url(#colorNeedsReview)"
                  name="Needs Review %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Confidence Distribution */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="mb-6">
              <h3 className="text-slate-900 mb-1">Confidence Score Distribution</h3>
              <p className="text-sm text-slate-500">Providers grouped by AI confidence level</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={confidenceDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="range" stroke="#64748b" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} name="Providers" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="mb-6">
            <h3 className="text-slate-900 mb-1">Recent Activity</h3>
            <p className="text-sm text-slate-500">Latest verification updates</p>
          </div>
          <div className="space-y-4">
            {[
              { action: "Automated verification completed", count: 127, time: "5 minutes ago", type: "success" },
              { action: "Manual review required", count: 12, time: "23 minutes ago", type: "warning" },
              { action: "Data sources updated", count: 3, time: "1 hour ago", type: "info" },
              { action: "Providers verified", count: 89, time: "2 hours ago", type: "success" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === "success" ? "bg-green-500" :
                    activity.type === "warning" ? "bg-amber-500" :
                    "bg-blue-500"
                  }`} />
                  <div>
                    <p className="text-sm text-slate-900">{activity.action}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
                <span className="text-sm text-slate-600">{activity.count} providers</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
