import { Layout } from "../components/Layout";
import { Upload as UploadIcon, FileUp, CheckCircle2, Clock, Play } from "lucide-react";
import { useState } from "react";

export function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleStartVerification = () => {
    setIsProcessing(true);
    setProcessingStage(0);
    
    const stages = [0, 1, 2, 3, 4];
    let currentStage = 0;
    
    const interval = setInterval(() => {
      currentStage++;
      setProcessingStage(currentStage);
      
      if (currentStage >= stages.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsProcessing(false);
          setProcessingStage(0);
          setSelectedFile(null);
        }, 1000);
      }
    }, 1500);
  };

  const stages = [
    { label: "Parsing CSV file", icon: FileUp },
    { label: "Extracting provider data", icon: FileUp },
    { label: "Querying data sources", icon: Clock },
    { label: "Running AI verification", icon: Clock },
    { label: "Generating confidence scores", icon: CheckCircle2 },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <h2 className="text-slate-900 mb-1">Upload & Validation Job</h2>
          <p className="text-slate-600">Upload a CSV file to start automated provider verification</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <div className="text-center">
            {!selectedFile ? (
              <label className="cursor-pointer block">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 hover:border-teal-500 hover:bg-teal-50/30 transition-colors">
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-teal-50 rounded-full">
                      <UploadIcon className="w-8 h-8 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-slate-900 mb-1">Click to upload or drag and drop</p>
                      <p className="text-sm text-slate-500">CSV files only (max 10MB)</p>
                    </div>
                  </div>
                </div>
              </label>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-3 p-4 bg-slate-50 rounded-lg">
                  <FileUp className="w-5 h-5 text-slate-600" />
                  <span className="text-slate-900">{selectedFile.name}</span>
                  <span className="text-sm text-slate-500">
                    ({(selectedFile.size / 1024).toFixed(2)} KB)
                  </span>
                </div>

                {!isProcessing ? (
                  <button
                    onClick={handleStartVerification}
                    className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors mx-auto"
                  >
                    <Play className="w-4 h-4" />
                    Start Automated Verification
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-teal-600 rounded-full animate-pulse" />
                      <p className="text-slate-900">Processing...</p>
                    </div>
                    
                    <div className="space-y-3">
                      {stages.map((stage, index) => {
                        const Icon = stage.icon;
                        const isComplete = index < processingStage;
                        const isCurrent = index === processingStage;
                        
                        return (
                          <div
                            key={index}
                            className={`flex items-center gap-3 p-3 rounded-lg ${
                              isComplete ? "bg-green-50" :
                              isCurrent ? "bg-blue-50" :
                              "bg-slate-50"
                            }`}
                          >
                            {isComplete ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                            ) : (
                              <Icon className={`w-5 h-5 ${
                                isCurrent ? "text-blue-600" : "text-slate-400"
                              }`} />
                            )}
                            <span className={`text-sm ${
                              isComplete ? "text-green-900" :
                              isCurrent ? "text-blue-900" :
                              "text-slate-500"
                            }`}>
                              {stage.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* CSV Format Guide */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-slate-900 mb-4">CSV Format Requirements</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-900 mb-2">Required Columns:</p>
              <div className="flex flex-wrap gap-2">
                {["Provider Name", "Specialty", "Phone", "Address", "City", "State", "ZIP", "NPI"].map((col) => (
                  <span key={col} className="px-3 py-1 bg-slate-100 text-slate-700 rounded text-sm">
                    {col}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-slate-900 mb-2">Sample CSV Format:</p>
              <div className="bg-slate-50 p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs text-slate-600 whitespace-pre">
Provider Name,Specialty,Phone,Address,City,State,ZIP,NPI{'\n'}
Dr. John Smith,Cardiology,(555) 123-4567,123 Main St,New York,NY,10001,1234567890{'\n'}
Dr. Jane Doe,Pediatrics,(555) 987-6543,456 Oak Ave,Boston,MA,02101,0987654321
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Jobs */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-slate-900 mb-4">Recent Verification Jobs</h3>
          <div className="space-y-3">
            {[
              { file: "providers_batch_dec_2024.csv", records: 1250, status: "Completed", date: "Dec 15, 2024", verified: 1087, review: 163 },
              { file: "new_providers_nov.csv", records: 523, status: "Completed", date: "Nov 28, 2024", verified: 478, review: 45 },
              { file: "provider_update_oct.csv", records: 892, status: "Completed", date: "Oct 12, 2024", verified: 856, review: 36 },
            ].map((job, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-teal-300 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-50 rounded">
                    <FileUp className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-900">{job.file}</p>
                    <p className="text-xs text-slate-500">{job.records} records • {job.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-green-600">{job.verified} verified</p>
                    <p className="text-xs text-amber-600">{job.review} needs review</p>
                  </div>
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                    {job.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
