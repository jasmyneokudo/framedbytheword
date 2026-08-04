import { IconBrandWhatsapp } from "@tabler/icons-react";

const WHATSAPP_NUMBER = "+2349068661808"; // Replace with your business WhatsApp number
const WHATSAPP_MESSAGE = "Hi FramedWithTheWord, I have a question about your scripture frames.";

export function WhatsAppFloat() {
  const href = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background"
    >
      <IconBrandWhatsapp size={28} className="h-7 w-7" />
    </a>
  );
}
