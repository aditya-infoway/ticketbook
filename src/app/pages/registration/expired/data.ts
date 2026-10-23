export interface ExpiredRegistration {
  id: string;
  companyName: string;
  contactNo: string;
  gmailId: string;
  state: string;
  city: string;
  registrationDate: string;
  expiredDate: string;
}

export const expiredRegistrations: ExpiredRegistration[] = [
  {
    id: "exp-1",
    companyName: "Sunrise Traders",
    contactNo: "9876501234",
    gmailId: "sunrise.traders@gmail.com",
    state: "Maharashtra",
    city: "Pune",
    registrationDate: "2024-03-15",
    expiredDate: "2025-03-14",
  },
  {
    id: "exp-2",
    companyName: "Green Valley Farms",
    contactNo: "9123409876",
    gmailId: "greenvalley.farms@gmail.com",
    state: "Gujarat",
    city: "Ahmedabad",
    registrationDate: "2023-11-01",
    expiredDate: "2024-10-31",
  },
  {
    id: "exp-3",
    companyName: "Metro Logistics",
    contactNo: "9988012345",
    gmailId: "metro.logistics@gmail.com",
    state: "Karnataka",
    city: "Bengaluru",
    registrationDate: "2024-06-20",
    expiredDate: "2025-06-19",
  },
  {
    id: "exp-4",
    companyName: "City Mart Retail",
    contactNo: "9012345678",
    gmailId: "citymart.retail@gmail.com",
    state: "Delhi",
    city: "New Delhi",
    registrationDate: "2023-08-10",
    expiredDate: "2024-08-09",
  },
];
