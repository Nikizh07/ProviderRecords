import { Layout } from "../components/Layout";
import { mockProviders } from "../data/mockData";
import { AlertTriangle, Eye, ThumbsUp, ThumbsDown, ExternalLink } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { toast } from "sonner";

export function ReviewQueue() {
  const [providers, setProviders] = useState(mockProviders);
  const needsReviewProviders = providers.filter((p) => p.status === "Needs Review");

  const handleApprove = (providerId: string) => {
    setProviders((prev) =>
      prev.map((p) =>
        p.id === providerId ? { ...p, status: "Verified" as const } : p
      )
    );
    const provider = providers.find((p) => p.id === providerId);
    toast.success(`${provider?.name} approved and verified`);
  };

  const handleReject = (providerId: string) => {
    setProviders((prev) => prev.filter((p) => p.id !== providerId));
    const provider = providers.find((p) => p.id === providerId);
    toast.error(`${provider?.name} rejected and removed from queue`);
  };

  const handleExportQueue = () => {
    const csvContent = [
      ["Name", "Specialty", "Location", "Phone", "Email", "NPI", "Confidence Score"],
      ...needsReviewProviders.map((p) => [
        p.name,
        p.specialty,
        p.location,
        p.phone,
        p.email,
        p.npi,
        `${p.confidenceScore}%`,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `review-queue-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success("Review queue exported successfully");
  };

  const handleAssignToTeam = () => {
    toast.info("Assign to Team feature coming soon", {
      description: "This will allow you to assign review tasks to team members",
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-slate-900 mb-1">Manual Review Queue</h2>
            <p className="text-slate-600">Low-confidence records requiring human verification</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-amber-900">{needsReviewProviders.length} pending reviews</span>
            </div>
          </div>
        </div>

        {/* Queue Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="p-1 bg-blue-100 rounded">
              <AlertTriangle className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-blue-900 mb-1">Review Priority</p>
              <p className="text-xs text-blue-700">
                Records are sorted by confidence score (lowest first). Review and approve accurate data or reject incorrect information.
              </p>
            </div>
          </div>
        </div>

        {/* Review Cards */}
        <div className="space-y-4">
          {needsReviewProviders
            .sort((a, b) => a.confidenceScore - b.confidenceScore)
            .map((provider) => (
              <div key={provider.id} className="bg-white rounded-lg border border-amber-200 p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-slate-900 mb-1">{provider.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <span>{provider.specialty}</span>
                      <span>•</span>
                      <span>{provider.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-xs text-slate-500 mb-1">Confidence Score</p>
                      <p className={`text-lg ${
                        provider.confidenceScore >= 80 ? "text-blue-600" :
                        provider.confidenceScore >= 70 ? "text-amber-600" :
                        "text-red-600"
                      }`}>
                        {provider.confidenceScore}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Phone</p>
                    <p className="text-sm text-slate-900">{provider.phone}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Email</p>
                    <p className="text-sm text-slate-900">{provider.email}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">NPI</p>
                    <p className="text-sm text-slate-900">{provider.npi}</p>
                  </div>
                </div>

                {/* Data Source Issues */}
                <div className="mb-4 p-4 bg-amber-50 rounded-lg">
                  <p className="text-sm text-amber-900 mb-2">Data Source Issues:</p>
                  <ul className="space-y-1">
                    {provider.dataSources
                      .filter((s) => s.status !== "match")
                      .map((source, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-amber-800">
                          <AlertTriangle className="w-3 h-3" />
                          <span>
                            {source.name}: {source.status === "mismatch" ? "Data mismatch detected" : "Provider not found"}
                          </span>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-600 hover:text-amber-700"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <Link
                    to={`/providers/${provider.id}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Link>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleApprove(provider.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      Approve
                    </button>
                    <button 
                      onClick={() => handleReject(provider.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm"
                    >
                      <ThumbsDown className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Empty State */}
        {needsReviewProviders.length === 0 && (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-green-50 rounded-full mb-4">
                <ThumbsUp className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-slate-900 mb-2">All caught up!</p>
              <p className="text-sm text-slate-500">There are no providers pending manual review</p>
            </div>
          </div>
        )}

        {/* Bulk Actions */}
        {needsReviewProviders.length > 0 && (
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                {needsReviewProviders.length} provider{needsReviewProviders.length !== 1 ? 's' : ''} in queue
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={handleExportQueue}
                  className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Export Queue
                </button>
                <button 
                  onClick={handleAssignToTeam}
                  className="px-4 py-2 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Assign to Team
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
