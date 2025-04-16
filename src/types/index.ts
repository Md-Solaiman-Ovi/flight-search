/* eslint-disable @typescript-eslint/no-explicit-any */
// types/index.ts
export interface Segment {
  marketingcareer: string;
  marketingcareerName: string;
  marketingflight: string;
  operatingcareer: string;
  operatingflight: string;
  departure: string;
  departureAirport: string;
  departureLocation: string;
  departureTime: string;
  arrival: string;
  arrivalTime: string;
  arrivalAirport: string;
  arrivalLocation: string;
  flightduration: string;
  bookingcode: string;
  seat: string;
}

export interface Segments {
  go: Segment[];
  back?: Segment[];
}

export interface FlightData {
  system: string;
  segment: string;
  uId: string;
  triptype: string;
  career: string;
  careerName: string;
  lastTicketTime: string;
  BasePrice: number;
  Taxes: number;
  netfare: string;
  agentprice: string;
  subagentprice: string;
  customerPrice: number;
  comission: string;
  comissiontype: string;
  comissionvalue: string;
  farecurrency: string;
  airlinescomref: string;
  pricebreakdown: any[];
  godeparture: string;
  godepartureTime: string;
  godepartureDate: string;
  goarrival: string;
  goarrivalTime: string;
  goarrivalDate: string;
  backdeparture: string;
  backdepartureTime: string;
  backdepartureDate: string;
  backarrival: string;
  backarrivalTime: string;
  backarrivalDate: string;
  goflightduration: string;
  backflightduration: string;
  transit: any;
  bags: string;
  seat: string;
  class: string;
  refundable: string;
  segments: Segments;
  ischeap: boolean;
}
