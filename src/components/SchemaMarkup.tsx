import React from "react";
import { siteConfig } from "@/config/site";

export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    "name": siteConfig.name,
    "image": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=1200",
    "@id": `https://sovereign.pixorastudios.com/#bar`,
    "url": "https://sovereign.pixorastudios.com",
    "telephone": siteConfig.socials.phone,
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.location.address,
      "addressLocality": "Patia, Bhubaneswar",
      "addressRegion": "Odisha",
      "postalCode": "751024",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": siteConfig.location.lat,
      "longitude": siteConfig.location.lng
    },
    "openingHoursSpecification": siteConfig.hours.map(h => {
      let opens = "19:00";
      let closes = "01:00";
      if (h.days === "Sunday") {
        opens = "17:00";
        closes = "00:00";
      } else if (h.days === "Friday") {
        closes = "01:30";
      } else if (h.days === "Saturday") {
        closes = "02:00";
      }
      return {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": h.days,
        "opens": opens,
        "closes": closes
      };
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
