import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[hsl(var(--footer-background))] border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo, Description & Contact */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/assets/config/logo.png"
                alt="Acogas Logo"
                width={120}
                height={40}
                className="h-auto"
              />
            </div>
            <p className="text-muted-foreground text-sm">
              Soluciones profesionales en gas y energía. 
              Comprometidos con la calidad y el servicio al cliente.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">📧</span>
                <a 
                  href="mailto:contacto@acogas.com" 
                  className="text-foreground hover:text-primary transition-colors"
                >
                  contacto@acogas.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">📞</span>
                <a 
                  href="tel:+1234567890" 
                  className="text-foreground hover:text-primary transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">📍</span>
                <span className="text-muted-foreground">
                  Dirección de la empresa
                </span>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Productos</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/productos/gas-natural" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Gas Natural
                </Link>
              </li>
              <li>
                <Link 
                  href="/productos/gas-lp" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Gas LP
                </Link>
              </li>
              <li>
                <Link 
                  href="/productos/equipos" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Equipos
                </Link>
              </li>
              <li>
                <Link 
                  href="/productos/servicios" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Servicios
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/nosotros" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link 
                  href="/contacto" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/soporte" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Soporte
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Síguenos</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <span className="w-5 h-5 flex items-center justify-center">📘</span>
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <span className="w-5 h-5 flex items-center justify-center">📷</span>
                Instagram
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <span className="w-5 h-5 flex items-center justify-center">💼</span>
                LinkedIn
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <span className="w-5 h-5 flex items-center justify-center">🐦</span>
                Twitter
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <span className="w-5 h-5 flex items-center justify-center">📺</span>
                YouTube
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Copyright, Terms, Policy */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm text-center md:text-left">
              © {new Date().getFullYear()} Acogas. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
              <Link 
                href="/terminos" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Términos y Condiciones
              </Link>
              <Link 
                href="/privacidad" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Política de Privacidad
              </Link>
             
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}