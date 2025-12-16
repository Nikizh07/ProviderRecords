import { Layout } from "../components/Layout";
import { useParams, Link } from "react-router";
import { mockProviders } from "../data/mockData";
import { ArrowLeft, Phone, Mail, MapPin, CheckCircle2, AlertTriangle, ExternalLink, ThumbsUp, ThumbsDown, Clock } from "lucide-react";

export function ProviderDetail() {
  const { id } = useParams<{ id: string }>();
  const provider = mockProviders.find((p) => p.id === id);

  if (!provider) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
            <p className="text-slate-600">Provider not found</p>
            <Link to="/providers" className="text-teal-600 hover:text-teal-700 mt-4 inline-block">
              Back to directory
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <Link
          to="/providers"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to directory</span>
        </Link>

        {/* Provider Header */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-slate-900 mb-2">{provider.name}</h2>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <span>{provider.specialty}</span>
                <span>•</span>
                <span>NPI: {provider.npi}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {provider.status === "Verified" ? (
                <span className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" />
                  Verified
                </span>
              ) : (
                <span className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg">
                  <AlertTriangle className="w-4 h-4" />
                  Needs Review
                </span>
              )}
            </div>
          </div>

          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
              <Phone className="w-5 h-5 text-slate-600 mt-0.5" />
              <div>
                <p className="text-xs text-slate-500 mb-1">Phone</p>
                <p className="text-sm text-slate-900">{provider.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
              <Mail className="w-5 h-5 text-slate-600 mt-0.5" />
              <div>
                <p className="text-xs text-slate-500 mb-1">Email</p>
                <p className="text-sm text-slate-900">{provider.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
              <MapPin className="w-5 h-5 text-slate-600 mt-0.5" />
              <div>
                <p className="text-xs text-slate-500 mb-1">Location</p>
                <p className="text-sm text-slate-900">{provider.location}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-slate-50 rounded-lg">
            <p className="text-xs text-slate-500 mb-1">Full Address</p>
            <p className="text-sm text-slate-900">{provider.address}</p>
          </div>
        </div>

        {/* Confidence Score */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-slate-900 mb-4">AI Confidence Score</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Overall Confidence</span>
                <span className="text-2xl text-slate-900">{provider.confidenceScore}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    provider.confidenceScore >= 90 ? "bg-green-500" :
                    provider.confidenceScore >= 80 ? "bg-blue-500" :
                    provider.confidenceScore >= 70 ? "bg-amber-500" :
                    "bg-red-500"
                  }`}
                  style={{ width: `${provider.confidenceScore}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
              <div>
                <p className="text-xs text-slate-500 mb-1">Name Match</p>
                <p className="text-sm text-slate-900">100%</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Phone Match</p>
                <p className="text-sm text-slate-900">
                  {provider.status === "Verified" ? "98%" : "65%"}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Address Match</p>
                <p className="text-sm text-slate-900">
                  {provider.status === "Verified" ? "95%" : "72%"}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Specialty Match</p>
                <p className="text-sm text-slate-900">100%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-slate-900 mb-4">Data Sources</h3>
          <div className="space-y-4">
            {provider.dataSources.map((source, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm text-slate-900">{source.name}</p>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-700"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <p className="text-xs text-slate-500">
                      Last checked: {new Date(source.lastChecked).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {source.status === "match" ? (
                      <span className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                        <CheckCircle2 className="w-3 h-3" />
                        Match
                      </span>
                    ) : source.status === "mismatch" ? (
                      <span className="flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs">
                        <AlertTriangle className="w-3 h-3" />
                        Mismatch
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
                        <Clock className="w-3 h-3" />
                        Not Found
                      </span>
                    )}
                    <span className="text-sm text-slate-600">{source.confidence}%</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(source.fields).map(([field, match]) => (
                    <div
                      key={field}
                      className={`px-3 py-1 rounded text-xs ${
                        match ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                      }`}
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        {provider.status === "Needs Review" && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-slate-900 mb-4">Manual Review Actions</h3>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <ThumbsUp className="w-4 h-4" />
                Approve & Verify
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                <ThumbsDown className="w-4 h-4" />
                Reject Changes
              </button>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              Review the data sources above and approve if the information is accurate.
            </p>
          </div>
        )}

        {/* Last Verified */}
        <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600">
          Last verified: {new Date(provider.lastVerified).toLocaleDateString()}
        </div>
      </div>
    </Layout>
  );
}
