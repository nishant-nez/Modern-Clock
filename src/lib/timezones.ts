export interface CityOption {
  id: string;
  city: string;
  country: string;
  timeZone: string;
}

export const CITY_OPTIONS: CityOption[] = [
  { id: "new-york", city: "New York", country: "United States", timeZone: "America/New_York" },
  { id: "los-angeles", city: "Los Angeles", country: "United States", timeZone: "America/Los_Angeles" },
  { id: "chicago", city: "Chicago", country: "United States", timeZone: "America/Chicago" },
  { id: "denver", city: "Denver", country: "United States", timeZone: "America/Denver" },
  { id: "toronto", city: "Toronto", country: "Canada", timeZone: "America/Toronto" },
  { id: "vancouver", city: "Vancouver", country: "Canada", timeZone: "America/Vancouver" },
  { id: "mexico-city", city: "Mexico City", country: "Mexico", timeZone: "America/Mexico_City" },
  { id: "bogota", city: "Bogotá", country: "Colombia", timeZone: "America/Bogota" },
  { id: "lima", city: "Lima", country: "Peru", timeZone: "America/Lima" },
  { id: "santiago", city: "Santiago", country: "Chile", timeZone: "America/Santiago" },
  { id: "buenos-aires", city: "Buenos Aires", country: "Argentina", timeZone: "America/Argentina/Buenos_Aires" },
  { id: "sao-paulo", city: "São Paulo", country: "Brazil", timeZone: "America/Sao_Paulo" },

  { id: "london", city: "London", country: "United Kingdom", timeZone: "Europe/London" },
  { id: "dublin", city: "Dublin", country: "Ireland", timeZone: "Europe/Dublin" },
  { id: "lisbon", city: "Lisbon", country: "Portugal", timeZone: "Europe/Lisbon" },
  { id: "madrid", city: "Madrid", country: "Spain", timeZone: "Europe/Madrid" },
  { id: "paris", city: "Paris", country: "France", timeZone: "Europe/Paris" },
  { id: "berlin", city: "Berlin", country: "Germany", timeZone: "Europe/Berlin" },
  { id: "rome", city: "Rome", country: "Italy", timeZone: "Europe/Rome" },
  { id: "warsaw", city: "Warsaw", country: "Poland", timeZone: "Europe/Warsaw" },
  { id: "athens", city: "Athens", country: "Greece", timeZone: "Europe/Athens" },
  { id: "helsinki", city: "Helsinki", country: "Finland", timeZone: "Europe/Helsinki" },
  { id: "stockholm", city: "Stockholm", country: "Sweden", timeZone: "Europe/Stockholm" },
  { id: "oslo", city: "Oslo", country: "Norway", timeZone: "Europe/Oslo" },
  { id: "copenhagen", city: "Copenhagen", country: "Denmark", timeZone: "Europe/Copenhagen" },
  { id: "vienna", city: "Vienna", country: "Austria", timeZone: "Europe/Vienna" },
  { id: "zurich", city: "Zurich", country: "Switzerland", timeZone: "Europe/Zurich" },
  { id: "moscow", city: "Moscow", country: "Russia", timeZone: "Europe/Moscow" },

  { id: "cairo", city: "Cairo", country: "Egypt", timeZone: "Africa/Cairo" },
  { id: "johannesburg", city: "Johannesburg", country: "South Africa", timeZone: "Africa/Johannesburg" },
  { id: "lagos", city: "Lagos", country: "Nigeria", timeZone: "Africa/Lagos" },
  { id: "nairobi", city: "Nairobi", country: "Kenya", timeZone: "Africa/Nairobi" },
  { id: "casablanca", city: "Casablanca", country: "Morocco", timeZone: "Africa/Casablanca" },
  { id: "addis-ababa", city: "Addis Ababa", country: "Ethiopia", timeZone: "Africa/Addis_Ababa" },

  { id: "dubai", city: "Dubai", country: "UAE", timeZone: "Asia/Dubai" },
  { id: "riyadh", city: "Riyadh", country: "Saudi Arabia", timeZone: "Asia/Riyadh" },
  { id: "doha", city: "Doha", country: "Qatar", timeZone: "Asia/Qatar" },
  { id: "tehran", city: "Tehran", country: "Iran", timeZone: "Asia/Tehran" },
  { id: "karachi", city: "Karachi", country: "Pakistan", timeZone: "Asia/Karachi" },
  { id: "kathmandu", city: "Kathmandu", country: "Nepal", timeZone: "Asia/Kathmandu" },

  { id: "mumbai", city: "Mumbai", country: "India", timeZone: "Asia/Kolkata" },
  { id: "delhi", city: "Delhi", country: "India", timeZone: "Asia/Kolkata" },
  { id: "kolkata", city: "Kolkata", country: "India", timeZone: "Asia/Kolkata" },
  { id: "bangalore", city: "Bangalore", country: "India", timeZone: "Asia/Kolkata" },

  { id: "bangkok", city: "Bangkok", country: "Thailand", timeZone: "Asia/Bangkok" },
  { id: "singapore", city: "Singapore", country: "Singapore", timeZone: "Asia/Singapore" },
  { id: "jakarta", city: "Jakarta", country: "Indonesia", timeZone: "Asia/Jakarta" },
  { id: "manila", city: "Manila", country: "Philippines", timeZone: "Asia/Manila" },
  { id: "kuala-lumpur", city: "Kuala Lumpur", country: "Malaysia", timeZone: "Asia/Kuala_Lumpur" },
  { id: "ho-chi-minh", city: "Ho Chi Minh City", country: "Vietnam", timeZone: "Asia/Ho_Chi_Minh" },

  { id: "hong-kong", city: "Hong Kong", country: "Hong Kong", timeZone: "Asia/Hong_Kong" },
  { id: "beijing", city: "Beijing", country: "China", timeZone: "Asia/Shanghai" },
  { id: "shanghai", city: "Shanghai", country: "China", timeZone: "Asia/Shanghai" },
  { id: "tokyo", city: "Tokyo", country: "Japan", timeZone: "Asia/Tokyo" },
  { id: "osaka", city: "Osaka", country: "Japan", timeZone: "Asia/Tokyo" },
  { id: "seoul", city: "Seoul", country: "South Korea", timeZone: "Asia/Seoul" },
  { id: "taipei", city: "Taipei", country: "Taiwan", timeZone: "Asia/Taipei" },

  { id: "sydney", city: "Sydney", country: "Australia", timeZone: "Australia/Sydney" },
  { id: "melbourne", city: "Melbourne", country: "Australia", timeZone: "Australia/Melbourne" },
  { id: "perth", city: "Perth", country: "Australia", timeZone: "Australia/Perth" },
  { id: "brisbane", city: "Brisbane", country: "Australia", timeZone: "Australia/Brisbane" },
  { id: "auckland", city: "Auckland", country: "New Zealand", timeZone: "Pacific/Auckland" },

  { id: "honolulu", city: "Honolulu", country: "United States", timeZone: "Pacific/Honolulu" },
  { id: "anchorage", city: "Anchorage", country: "United States", timeZone: "America/Anchorage" },
];
