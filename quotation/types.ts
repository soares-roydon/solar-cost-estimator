export interface ClientDetails {
  name: string;
  address?: string;
  date?: string; // Formatted date string, e.g. "29 October 2026"
}

export interface SystemSpecs {
  plantCapacityKw: number; // e.g. 11.00 or 12.00
  panelBrand: string; // e.g. "Premier Energies"
  panelModel: string; // e.g. "550Wp Bifacial" or "620Wp DCR TopCon"
  panelWattage: number; // e.g. 550 or 620
  numberOfPanels: number; // e.g. 20
  inverterCapacityKw: number; // e.g. 15
  inverterBrand: string; // e.g. "Vsole" or "SolarEdge"
  inverterType: string; // e.g. "Vsole Inverter with String"
  systemType: 'On-Grid' | 'Hybrid';
}

export interface CommercialDetails {
  systemCost: number; // Subtotal before GST (e.g. ₹ 3,95,824)
  gstRatePct?: number; // e.g. 8.90% or statutory dual rate
  gstAmount: number; // Total GST amount
  totalSystemCost: number; // Final Cost (e.g. ₹ 4,28,820)
  subsidyAmount?: number; // Optional subsidy (e.g. PM Surya Ghar)
  totalEffectiveCost?: number; // Total minus subsidy
  amountInWords?: string; // e.g. "Four Lakh Twenty-Eight Thousand Eight Hundred Twenty Rupees Only."
  fabricationAdditional?: number; // Optional additional fabrication / structure cost
  fabricationDescription?: string;
}

export interface PaymentStage {
  stage: string;
  percentage: number;
  amount: number;
}

export interface WarrantyTerms {
  panelsWarrantyYears: number; // default: 30
  inverterWarrantyYears: number; // default: 10
}

export interface BankDetails {
  bankName: string;
  branch: string;
  accountNumber: string;
  ifscCode: string;
  companyName: string;
  authorisedSignatoryTitle: string;
}

export interface QuotationData {
  client: ClientDetails;
  system: SystemSpecs;
  commercials: CommercialDetails;
  scopeOfWork?: string[];
  paymentTerms?: PaymentStage[];
  warranty?: WarrantyTerms;
  termsAndConditions?: string;
  bankDetails?: BankDetails;
}
