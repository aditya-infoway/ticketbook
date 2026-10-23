export interface Registration {
  id: string;
  companyName: string;
  companyAddress: string;
  contactNumber: string;
  ownerName: string;
  ownerContactNumber: string;
  ownerEmail: string;
  country: string;
  state: string;
  district: string;
  taluka: string;
  registrationDate: string;
  expiryDate: string;
  businessType: string;
  employeeSize: string;
  companyEmail: string;
  status?: string;
}