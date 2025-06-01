import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, useSkeleton } from '@shared/ui-shared';
import { SkeletonModule } from 'primeng/skeleton';

interface NavItem {
  label: string;
  icon: string;
  route?: string;
  action?: () => void;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, ButtonComponent, SkeletonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // Skeleton state
  private readonly skeletonState = useSkeleton<boolean>(1200);
  showSkeleton = this.skeletonState.loading;

  // Array para skeleton items
  skeletonItems = [1, 2, 3, 4];

  // Navigation state
  isMenuOpen = signal(false);

  // Navigation items
  navItems: NavItem[] = [
    { label: 'Inicio', icon: 'pi pi-home', route: '/home' },
    { label: 'Análisis', icon: 'pi pi-eye', route: '/analysis' },
    { label: 'Historial', icon: 'pi pi-history', route: '/history' },
    { label: 'Reportes', icon: 'pi pi-chart-bar', route: '/reports' },
  ];

  // User actions
  userActions: NavItem[] = [
    { label: 'Perfil', icon: 'pi pi-user', route: '/profile' },
    { label: 'Configuración', icon: 'pi pi-cog', route: '/settings' },
    { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', action: () => this.logout() },
  ];

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }

  logout() {
    console.log('Cerrando sesión...');
  }

  onNavClick(item: NavItem) {
    if (item.action) {
      item.action();
    } else if (item.route) {
      console.log('Navegando a:', item.route);
    }
    this.isMenuOpen.set(false);
  }
}
