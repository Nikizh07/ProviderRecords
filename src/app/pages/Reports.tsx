import { Layout } from "../components/Layout";
import { Download, FileText, Calendar, CheckCircle2, AlertTriangle } from "lucide-react";
import { mockProviders, dashboardStats } from "../data/mockData";

export function Reports() {
  const verifiedProviders = mockProviders.filter((p) => p.status === "Verified");
  const needsReviewProviders = mockProviders.filter((p) => p.status === "Needs Review");

  const generateReport = (format: "csv" | "pdf") => {
    console.log(`Generating ${format.toUpperCase()} report...`);
    // In a real app, this would trigger a download
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <h2 className="text-slate-900 mb-1">Reports & Export</h2>
          <p className="text-slate-600">Download verified provider directory and verification reports</p>
        </div>

        {/* Export Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Verified Directory */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900 mb-1">Verified Provider Directory</h3>
                <p className="text-sm text-slate-600">
                  Export all verified provider records with complete contact information
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Total Records</span>
                <span className="text-sm text-slate-900">{verifiedProviders.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Last Updated</span>
                <span className="text-sm text-slate-900">
                  {new Date(dashboardStats.lastUpdated).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Avg. Confidence</span>
                <span className="text-sm text-slate-900">{dashboardStats.averageConfidenceScore}%</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => generateReport("csv")}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button
                onClick={() => generateReport("pdf")}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Export PDF
              </button>
            </div>
          </div>

          {/* Review Queue Report */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-amber-50 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900 mb-1">Review Queue Report</h3>
                <p className="text-sm text-slate-600">
                  Export providers requiring manual review with confidence scores
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Pending Reviews</span>
                <span className="text-sm text-slate-900">{needsReviewProviders.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Priority Items</span>
                <span className="text-sm text-slate-900">
                  {needsReviewProviders.filter((p) => p.confidenceScore < 70).length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Avg. Confidence</span>
                <span className="text-sm text-slate-900">
                  {(needsReviewProviders.reduce((acc, p) => acc + p.confidenceScore, 0) / needsReviewProviders.length).toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => generateReport("csv")}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button
                onClick={() => generateReport("pdf")}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Export PDF
              </button>
            </div>
          </div>
        </div>

        {/* Custom Report Builder */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-slate-900 mb-4">Custom Report Builder</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Date Range */}
            <div>
              <label className="block text-sm text-slate-700 mb-2">Date Range</label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="date"
                    defaultValue="2024-01-01"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <span className="flex items-center text-slate-500">to</span>
                <div className="flex-1">
                  <input
                    type="date"
                    defaultValue="2024-12-16"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Filter by Status */}
            <div>
              <label className="block text-sm text-slate-700 mb-2">Filter by Status</label>
              <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                <option value="all">All Providers</option>
                <option value="verified">Verified Only</option>
                <option value="needs-review">Needs Review Only</option>
              </select>
            </div>

            {/* Specialty Filter */}
            <div>
              <label className="block text-sm text-slate-700 mb-2">Specialty</label>
              <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                <option value="all">All Specialties</option>
                <option value="cardiology">Cardiology</option>
                <option value="orthopedic">Orthopedic Surgery</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="dermatology">Dermatology</option>
              </select>
            </div>

            {/* Confidence Threshold */}
            <div>
              <label className="block text-sm text-slate-700 mb-2">Min. Confidence Score</label>
              <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                <option value="0">All Scores</option>
                <option value="90">90% and above</option>
                <option value="80">80% and above</option>
                <option value="70">70% and above</option>
              </select>
            </div>
          </div>

          {/* Include Options */}
          <div className="mb-6">
            <label className="block text-sm text-slate-700 mb-3">Include in Report</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                "Contact Information",
                "Confidence Scores",
                "Data Sources",
                "Verification Dates",
                "NPI Numbers",
                "Specialties",
                "Locations",
                "Email Addresses",
              ].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-2 focus:ring-teal-500"
                  />
                  <span className="text-sm text-slate-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => generateReport("csv")}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Download className="w-4 h-4" />
              Generate Custom Report
            </button>
            <button className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
              Reset Filters
            </button>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-slate-900 mb-4">Recent Reports</h3>
          <div className="space-y-3">
            {[
              { name: "Verified_Providers_Dec_2024.csv", date: "Dec 15, 2024", size: "2.4 MB", records: 11213 },
              { name: "Review_Queue_Report_Dec.pdf", date: "Dec 14, 2024", size: "890 KB", records: 1632 },
              { name: "Monthly_Verification_Summary_Nov.pdf", date: "Nov 30, 2024", size: "1.2 MB", records: 10689 },
              { name: "Custom_Report_Cardiology.csv", date: "Nov 28, 2024", size: "450 KB", records: 1842 },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-teal-300 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-50 rounded">
                    <FileText className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-900">{report.name}</p>
                    <p className="text-xs text-slate-500">{report.records} records • {report.size} • {report.date}</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm text-teal-700 hover:bg-teal-50 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
