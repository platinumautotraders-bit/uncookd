import type { DeliveryZone } from "@/types";

export const deliveryZones: DeliveryZone[] = [
  {
    id: "brisbane-south",
    name: "Brisbane South (HQ)",
    center: "Underwood, QLD",
    radiusKm: 50,
    postcodeRanges: [
      "4000-4030", // Brisbane CBD
      "4031-4060", // Inner north
      "4100-4132", // South Brisbane, Underwood area
      "4133-4165", // Logan, Beenleigh
      "4170-4179", // East Brisbane
      "4207-4230", // Gold Coast north
      "4300-4340", // Ipswich area
    ],
    deliveryDays: ["Monday", "Wednesday", "Friday"],
    cutoffTime: "18:00",
  },
  {
    id: "sydney",
    name: "Sydney Metro",
    center: "Sydney, NSW",
    radiusKm: 50,
    postcodeRanges: [
      "2000-2050", // Sydney CBD, Inner West
      "2060-2100", // North Shore
      "2110-2170", // West Sydney
      "2190-2234", // South West
      "2500-2530", // Wollongong area
    ],
    deliveryDays: ["Tuesday", "Thursday", "Saturday"],
    cutoffTime: "18:00",
  },
];

export const deliveryConfig = {
  standardFee: 10,
  freeThreshold: 100,
  premiumFreeDelivery: true,
  standardDeliveryWindow: "9am - 6pm",
  premiumDeliveryWindow: "Choose your 1-hour window",
};
