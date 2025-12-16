import { Layout } from "../components/Layout";
import { Search, Filter, CheckCircle2, AlertTriangle, Eye } from "lucide-react";
import { mockProviders } from "../data/mockData";
import { Link } from "react-router";
import { useState } from "react";

export function ProvidersDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "Verified" | "Needs Review">("all");

  const filteredProviders = mockProviders.filter((provider) => {
    const matchesSearch = 
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || provider.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-slate-900 mb-1">Provider Directory</h2>
            <p className="text-slate-600">Browse and manage verified provider information</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600">
              {filteredProviders.length} of {mockProviders.length} providers
            </span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, specialty, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="Verified">Verified Only</option>
                <option value="Needs Review">Needs Review Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Providers Table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-6 py-4 text-sm text-slate-700">Provider Name</th>
                  <th className="text-left px-6 py-4 text-sm text-slate-700">Specialty</th>
                  <th className="text-left px-6 py-4 text-sm text-slate-700">Location</th>
                  <th className="text-left px-6 py-4 text-sm text-slate-700">Phone</th>
                  <th className="text-left px-6 py-4 text-sm text-slate-700">Status</th>
                  <th className="text-left px-6 py-4 text-sm text-slate-700">Confidence</th>
                  <th className="text-left px-6 py-4 text-sm text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProviders.map((provider) => (
                  <tr key={provider.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-slate-900">{provider.name}</p>
                        <p className="text-xs text-slate-500">NPI: {provider.npi}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-700">{provider.specialty}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-700">{provider.location}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-700">{provider.phone}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {provider.status === "Verified" ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-700">Verified</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4 text-amber-600" />
                            <span className="text-sm text-amber-700">Needs Review</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2 w-16">
                          <div
                            className={`h-2 rounded-full ${
                              provider.confidenceScore >= 90 ? "bg-green-500" :
                              provider.confidenceScore >= 80 ? "bg-blue-500" :
                              provider.confidenceScore >= 70 ? "bg-amber-500" :
                              "bg-red-500"
                            }`}
                            style={{ width: `${provider.confidenceScore}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-700 min-w-[3rem] text-right">
                          {provider.confidenceScore}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/providers/${provider.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredProviders.length === 0 && (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 mb-2">No providers found</p>
            <p className="text-sm text-slate-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
