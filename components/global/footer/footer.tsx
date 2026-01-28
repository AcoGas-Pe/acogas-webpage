import Image from "next/image";
import Link from "next/link";
import { 
  BUSINESS_INFO, 
  CONTACT, 
  PRODUCT_BRANDS,
  TOP_LEVEL_CATEGORIES,
  SOCIAL_MEDIA,
  getCompanyLinks,
  getLegalLinks,
  formatPhoneTel,
  type SocialMedia as SocialMediaType,
  getPhoneDisplay,
  GOOGLE_MAPS
} from "@/lib/business-config";
import { 
  Mail, 
  Phone, 
  MapPin, 
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube, FaTiktok } from "react-icons/fa";
import type { ComponentType } from "react";

// Social Media Icon Mapping Interface
interface SocialIconMap {
  [key: string]: ComponentType<{ className?: string }>;
}

const SOCIAL_ICONS: SocialIconMap = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  youtube: FaYoutube,
  tiktok: FaTiktok,
};


// Helper function to get social media display name
const getSocialDisplayName = (platform: string): string => {
  const names: { [key: string]: string } = {
    facebook: "Facebook",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    twitter: "Twitter",
    youtube: "YouTube",
    tiktok: "TikTok",
    pinterest: "Pinterest",
    nextdoor: "Nextdoor",
    yelp: "Yelp",
  };
  return names[platform] || platform.charAt(0).toUpperCase() + platform.slice(1);
};

// Helper function to get active social media entries
const getActiveSocialMedia = (): Array<{ platform: keyof SocialMediaType; url: string; icon: ComponentType<{ className?: string }>; name: string }> => {
  return Object.entries(SOCIAL_MEDIA)
    .filter(([_, url]) => url)
    .map(([platform, url]) => ({
      platform: platform as keyof SocialMediaType,
      url: url as string,
      icon: SOCIAL_ICONS[platform] || MapPin,
      name: getSocialDisplayName(platform),
    }));
};

// Helper function to format contact items (supports arrays for future expansion)
const getContactEmails = (): string[] => {
  return CONTACT.email ? CONTACT.email : [];
};

const getContactPhones = (): string[] => {
  return CONTACT.phone ? CONTACT.phone : [];
};

export function Footer() {
  const companyLinks = getCompanyLinks();
  const legalLinks = getLegalLinks();
  const activeSocialMedia = getActiveSocialMedia();
  const emails = getContactEmails();
  const phones = getContactPhones();

  return (
    <footer className="bg-[hsl(var(--footer-background))] border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Logo, Description & Contact */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src={BUSINESS_INFO.logoUrl}
                alt={`${BUSINESS_INFO.name} Logo`}
                width={120}
                height={40}
                className="h-auto"
              />
            </div>
            <p className="text-muted-foreground text-sm">
              {BUSINESS_INFO.tagline}
            </p>
            <div className="space-y-2 text-sm">
              {/* Email(s) */}

              <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-foreground" />
              Escribenos:
              </div>
              <div className="flex flex-row gap-2 flex-wrap"> 
              {emails.map((email, index) => (
                <div key={`email-${index}`} className="flex items-center gap-2">
                  <a 
                    href={`mailto:${email}`} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {email}
                  </a>
                </div>
              ))}
              </div>


            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-foreground" />
              Llámanos:
              </div>              {/* Phone(s) */}
            <div className="flex flex-row gap-2 flex-wrap"> 
              {phones.map((phone, index) => (
                <div key={`phone-${index}`} className="flex items-center gap-2">
                  <a 
                    href={`tel:${formatPhoneTel(phone)}`} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {getPhoneDisplay()}
                  </a>
                </div>
              ))}
              </div>
              {/* Address */}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-foreground" />
                Encuéntranos:
              </div>
              {CONTACT.addressVisibility === 'VISIBLE' && (
                <div className="flex items-center gap-2">
                  <a 
                    href={`${GOOGLE_MAPS.shortLink}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {CONTACT.address}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Products Categories Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Productos</h3>
            <ul className="space-y-2">
              {TOP_LEVEL_CATEGORIES.map((category) => (
                <li key={category.url}>
                  <Link 
                    href={category.url} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Marcas</h3>
            <ul className="space-y-2">
              {PRODUCT_BRANDS.map((brand) => (
                <li key={brand.url}>
                  <Link 
                    href={brand.url} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Empresa</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Section */}
          {activeSocialMedia.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-4">Síguenos</h3>
              <div className="flex flex-col space-y-3">
                {activeSocialMedia.map(({ platform, url, icon: Icon, name }) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    <Icon className="w-5 h-5" />
                    {name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar - Copyright, Terms, Policy */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm text-center md:text-left">
              © {new Date().getFullYear()} {BUSINESS_INFO.name.trim()}. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
              {legalLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}