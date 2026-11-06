// Add the business's verified contact details before publishing.
// WhatsApp number format: country code + number, digits only (example format: 91XXXXXXXXXX).
export const BUSINESS = {
  phoneDisplay: "Add verified phone number",
  phoneLink: "", // Example: +919XXXXXXXXX
  whatsappNumber: "", // Example: 919XXXXXXXXX (digits only)
  address: "Add the confirmed property address",
  mapsUrl: "", // Paste the verified Google Maps share link
  instagramUrl: "",
  facebookUrl: "",
};

export const whatsappUrl = (message = "Hello, I would like to enquire about an event at R R Gardens & Villa Resort.") =>
  BUSINESS.whatsappNumber
    ? `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`
    : "#contact";
