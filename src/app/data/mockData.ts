export interface Provider {
  id: string;
  name: string;
  specialty: string;
  location: string;
  phone: string;
  email: string;
  status: "Verified" | "Needs Review";
  confidenceScore: number;
  address: string;
  npi: string;
  lastVerified: string;
  dataSources: DataSource[];
}

export interface DataSource {
  name: string;
  url: string;
  lastChecked: string;
  status: "match" | "mismatch" | "not-found";
  confidence: number;
  fields: {
    name: boolean;
    phone: boolean;
    address: boolean;
    specialty: boolean;
  };
}

export const mockProviders: Provider[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    location: "New York, NY",
    phone: "(212) 555-0123",
    email: "s.johnson@cardiocare.com",
    status: "Verified",
    confidenceScore: 98,
    address: "450 Park Avenue, Suite 1200, New York, NY 10022",
    npi: "1234567890",
    lastVerified: "2024-12-10",
    dataSources: [
      {
        name: "NPI Registry",
        url: "https://npiregistry.cms.hhs.gov",
        lastChecked: "2024-12-10",
        status: "match",
        confidence: 99,
        fields: { name: true, phone: true, address: true, specialty: true }
      },
      {
        name: "Hospital Website",
        url: "https://nypresbyterian.org",
        lastChecked: "2024-12-10",
        status: "match",
        confidence: 97,
        fields: { name: true, phone: true, address: true, specialty: true }
      }
    ]
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Orthopedic Surgery",
    location: "Los Angeles, CA",
    phone: "(310) 555-0198",
    email: "m.chen@orthospecialists.com",
    status: "Verified",
    confidenceScore: 95,
    address: "8700 Beverly Blvd, Suite 200, Los Angeles, CA 90048",
    npi: "2345678901",
    lastVerified: "2024-12-12",
    dataSources: [
      {
        name: "NPI Registry",
        url: "https://npiregistry.cms.hhs.gov",
        lastChecked: "2024-12-12",
        status: "match",
        confidence: 98,
        fields: { name: true, phone: true, address: true, specialty: true }
      },
      {
        name: "Medical Board",
        url: "https://mbc.ca.gov",
        lastChecked: "2024-12-12",
        status: "match",
        confidence: 92,
        fields: { name: true, phone: false, address: true, specialty: true }
      }
    ]
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    location: "Chicago, IL",
    phone: "(312) 555-0145",
    email: "e.rodriguez@chicagopeds.com",
    status: "Needs Review",
    confidenceScore: 72,
    address: "233 E Erie St, Chicago, IL 60611",
    npi: "3456789012",
    lastVerified: "2024-11-28",
    dataSources: [
      {
        name: "NPI Registry",
        url: "https://npiregistry.cms.hhs.gov",
        lastChecked: "2024-12-14",
        status: "mismatch",
        confidence: 75,
        fields: { name: true, phone: false, address: true, specialty: true }
      },
      {
        name: "Hospital Directory",
        url: "https://northwesternmedicine.org",
        lastChecked: "2024-12-14",
        status: "match",
        confidence: 85,
        fields: { name: true, phone: true, address: false, specialty: true }
      }
    ]
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialty: "Dermatology",
    location: "Houston, TX",
    phone: "(713) 555-0176",
    email: "j.wilson@dermhouston.com",
    status: "Verified",
    confidenceScore: 91,
    address: "6624 Fannin St, Suite 1480, Houston, TX 77030",
    npi: "4567890123",
    lastVerified: "2024-12-08",
    dataSources: [
      {
        name: "NPI Registry",
        url: "https://npiregistry.cms.hhs.gov",
        lastChecked: "2024-12-08",
        status: "match",
        confidence: 95,
        fields: { name: true, phone: true, address: true, specialty: true }
      },
      {
        name: "Practice Website",
        url: "https://dermhouston.com",
        lastChecked: "2024-12-08",
        status: "match",
        confidence: 87,
        fields: { name: true, phone: true, address: true, specialty: true }
      }
    ]
  },
  {
    id: "5",
    name: "Dr. Maria Garcia",
    specialty: "Internal Medicine",
    location: "Phoenix, AZ",
    phone: "(602) 555-0132",
    email: "m.garcia@internalmedicine.com",
    status: "Needs Review",
    confidenceScore: 68,
    address: "1919 E Thomas Rd, Phoenix, AZ 85016",
    npi: "5678901234",
    lastVerified: "2024-11-15",
    dataSources: [
      {
        name: "NPI Registry",
        url: "https://npiregistry.cms.hhs.gov",
        lastChecked: "2024-12-15",
        status: "mismatch",
        confidence: 70,
        fields: { name: true, phone: false, address: false, specialty: true }
      },
      {
        name: "Medical Group Site",
        url: "https://phxmedicalgroup.com",
        lastChecked: "2024-12-15",
        status: "not-found",
        confidence: 0,
        fields: { name: false, phone: false, address: false, specialty: false }
      }
    ]
  },
  {
    id: "6",
    name: "Dr. Robert Thompson",
    specialty: "Neurology",
    location: "Philadelphia, PA",
    phone: "(215) 555-0189",
    email: "r.thompson@pennneuro.com",
    status: "Verified",
    confidenceScore: 96,
    address: "3400 Spruce St, Philadelphia, PA 19104",
    npi: "6789012345",
    lastVerified: "2024-12-11",
    dataSources: [
      {
        name: "NPI Registry",
        url: "https://npiregistry.cms.hhs.gov",
        lastChecked: "2024-12-11",
        status: "match",
        confidence: 97,
        fields: { name: true, phone: true, address: true, specialty: true }
      },
      {
        name: "University Hospital",
        url: "https://pennmedicine.org",
        lastChecked: "2024-12-11",
        status: "match",
        confidence: 95,
        fields: { name: true, phone: true, address: true, specialty: true }
      }
    ]
  },
  {
    id: "7",
    name: "Dr. Linda Martinez",
    specialty: "Family Medicine",
    location: "San Antonio, TX",
    phone: "(210) 555-0167",
    email: "l.martinez@familycare.com",
    status: "Needs Review",
    confidenceScore: 75,
    address: "4499 Medical Dr, San Antonio, TX 78229",
    npi: "7890123456",
    lastVerified: "2024-12-01",
    dataSources: [
      {
        name: "NPI Registry",
        url: "https://npiregistry.cms.hhs.gov",
        lastChecked: "2024-12-13",
        status: "match",
        confidence: 88,
        fields: { name: true, phone: true, address: true, specialty: true }
      },
      {
        name: "Clinic Website",
        url: "https://familycaresa.com",
        lastChecked: "2024-12-13",
        status: "mismatch",
        confidence: 62,
        fields: { name: true, phone: false, address: true, specialty: true }
      }
    ]
  },
  {
    id: "8",
    name: "Dr. David Kim",
    specialty: "Gastroenterology",
    location: "San Diego, CA",
    phone: "(619) 555-0154",
    email: "d.kim@sdgi.com",
    status: "Verified",
    confidenceScore: 93,
    address: "9888 Genesee Ave, Suite 200, San Diego, CA 92037",
    npi: "8901234567",
    lastVerified: "2024-12-09",
    dataSources: [
      {
        name: "NPI Registry",
        url: "https://npiregistry.cms.hhs.gov",
        lastChecked: "2024-12-09",
        status: "match",
        confidence: 96,
        fields: { name: true, phone: true, address: true, specialty: true }
      },
      {
        name: "Medical Center",
        url: "https://health.ucsd.edu",
        lastChecked: "2024-12-09",
        status: "match",
        confidence: 90,
        fields: { name: true, phone: true, address: true, specialty: true }
      }
    ]
  }
];

export const dashboardStats = {
  totalProviders: 12845,
  verifiedPercentage: 87.3,
  needsReviewCount: 1632,
  averageConfidenceScore: 89.2,
  recentVerifications: 248,
  lastUpdated: "2024-12-16T10:30:00Z"
};

export const verificationTrend = [
  { month: "Jun", verified: 72, needsReview: 28 },
  { month: "Jul", verified: 75, needsReview: 25 },
  { month: "Aug", verified: 79, needsReview: 21 },
  { month: "Sep", verified: 82, needsReview: 18 },
  { month: "Oct", verified: 85, needsReview: 15 },
  { month: "Nov", verified: 87, needsReview: 13 }
];

export const confidenceDistribution = [
  { range: "90-100%", count: 8924 },
  { range: "80-89%", count: 2189 },
  { range: "70-79%", count: 1086 },
  { range: "Below 70%", count: 646 }
];
