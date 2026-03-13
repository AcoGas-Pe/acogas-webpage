import type { City } from "@/domain/city";
import citiesJson from "@/data/cities.json";

const CITIES: City[] = citiesJson.cities as City[];

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return CITIES.map((c) => c.slug);
}

export function getAllCities(): City[] {
  return CITIES;
}

export function getLimaCities(): City[] {
  return CITIES.filter((c) => c.isLimaDistrict || c.slug === "lima");
}

export function getRegionalCities(): City[] {
  return CITIES.filter((c) => !c.isLimaDistrict && c.slug !== "lima");
}
