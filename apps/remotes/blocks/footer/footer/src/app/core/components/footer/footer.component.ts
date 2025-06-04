import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, useSkeleton } from '@shared/ui-shared';
import { SkeletonModule } from 'primeng/skeleton';

export interface FooterLink {
  label: string;
  icon?: string;
  route?: string;
  action?: () => void;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;
  icon: string;
  url: string;
  ariaLabel: string;
}

@Component({
  selector: 'app-footer',
  imports: [CommonModule, ButtonComponent, SkeletonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
// Skeleton state
  private readonly skeletonState = useSkeleton<boolean>(1000);
  showSkeleton = this.skeletonState.loading;

// Array para skeleton items
  skeletonItems = [1, 2, 3, 4];

// Newsletter state
  isNewsletterOpen = signal(false);
  newsletterEmail = signal('');

// Footer sections
  footerSections: FooterSection[] = [
    {
      title: 'Producto',
      links: [
        { label: 'Características', route: '/features' },
        { label: 'Análisis IA', route: '/ai-analysis' },
        { label: 'Reportes', route: '/reports' },
        { label: 'Integraciones', route: '/integrations' },
        { label: 'API', route: '/api-docs' },
      ]
    },
    {
      title: 'Recursos',
      links: [
        { label: 'Documentación', route: '/docs' },
        { label: 'Guías Médicas', route: '/medical-guides' },
        { label: 'Casos de Estudio', route: '/case-studies' },
        { label: 'Webinars', route: '/webinars' },
        { label: 'Centro de Ayuda', route: '/help' },
      ]
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Acerca de', route: '/about' },
        { label: 'Equipo Médico', route: '/medical-team' },
        { label: 'Investigación', route: '/research' },
        { label: 'Prensa', route: '/press' },
        { label: 'Carreras', route: '/careers' },
      ]
    },
    {
      title: 'Soporte',
      links: [
        { label: 'Contacto', route: '/contact' },
        { label: 'Soporte Técnico', route: '/technical-support' },
        { label: 'Estado del Sistema', route: '/status', external: true },
        { label: 'Comunidad', route: '/community' },
        { label: 'Feedback', action: () => this.openFeedback() },
      ]
    }
  ];

// Social media links
  socialLinks: SocialLink[] = [
    {
      platform: 'LinkedIn',
      icon: 'pi pi-linkedin',
      url: 'https://linkedin.com/company/glaucovision',
      ariaLabel: 'Síguenos en LinkedIn'
    },
    {
      platform: 'Twitter',
      icon: 'pi pi-twitter',
      url: 'https://twitter.com/glaucovision',
      ariaLabel: 'Síguenos en Twitter'
    },
    {
      platform: 'YouTube',
      icon: 'pi pi-youtube',
      url: 'https://youtube.com/glaucovision',
      ariaLabel: 'Suscríbete a nuestro canal'
    },
    {
      platform: 'GitHub',
      icon: 'pi pi-github',
      url: 'https://github.com/glaucovision',
      ariaLabel: 'Contribuye en GitHub'
    }
  ];

// Legal links
  legalLinks: FooterLink[] = [
    { label: 'Política de Privacidad', route: '/privacy' },
    { label: 'Términos de Servicio', route: '/terms' },
    { label: 'Política de Cookies', route: '/cookies' },
    { label: 'Cumplimiento HIPAA', route: '/hipaa' },
    { label: 'Certificaciones', route: '/certifications' },
  ];

// Company info
  companyInfo = {
    name: 'GlaucoVision',
    description: 'Sistema avanzado de detección de glaucoma mediante inteligencia artificial, diseñado para profesionales de la salud visual.',
    address: 'Av. Médica 123, Lima, Perú',
    phone: '+51 1 234-5678',
    email: 'contacto@glaucovision.com',
    founded: '2024',
    certifications: ['FDA Approved', 'CE Marked', 'ISO 13485', 'HIPAA Compliant']
  };

  toggleNewsletter() {
    this.isNewsletterOpen.update(value => !value);
  }

  onFooterLinkClick(link: FooterLink) {
    if (link.action) {
      link.action();
    } else if (link.route) {
      if (link.external) {
        window.open(link.route, '_blank', 'noopener,noreferrer');
      } else {
        console.log('Navegando a:', link.route);
      }
    }
  }

  onSocialClick(social: SocialLink) {
    window.open(social.url, '_blank', 'noopener,noreferrer');
  }

  onNewsletterSubmit() {
    const email = this.newsletterEmail();
    if (email) {
      console.log('Suscribiendo email:', email);
      this.newsletterEmail.set('');
      this.toggleNewsletter();
    }
  }

  openFeedback() {
    console.log('Abriendo formulario de feedback...');
  }

  onEmailChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.newsletterEmail.set(target.value);
  }

  getCurrentYear() {
    return new Date().getFullYear();
  }
}
