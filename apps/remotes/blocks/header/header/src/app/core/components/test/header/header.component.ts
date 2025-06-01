import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BrandComponent,
  NavigationComponent,
  NotificationsComponent,
  SearchComponent,
  UserMenuComponent,
  NavigationVariant,
  NavigationSize
} from '@shared/ui-shared';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    BrandComponent,
    NavigationComponent,
    NotificationsComponent,
    SearchComponent,
    UserMenuComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // Brand
  appName = 'MedApp';
  logoUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iIzMzNjZGRiIvPgo8cGF0aCBkPSJNMTYgOEMxNy4xMDQ2IDggMTggOC44OTU0MyAxOCAxMFYxNEgyMkMyMy4xMDQ2IDE0IDI0IDE0Ljg5NTQgMjQgMTZDMjQgMTcuMTA0NiAyMy4xMDQ2IDE4IDIyIDE4SDE4VjIyQzE4IDIzLjEwNDYgMTcuMTA0NiAyNCAxNiAyNEMxNC44OTU0IDI0IDE0IDIzLjEwNDYgMTQgMjJWMThIMTBDOC44OTU0MyAxOCA4IDE3LjEwNDYgOCAxNkM4IDE0Ljg5NTQgOC44OTU0MyAxNCAxMCAxNEgxNFYxMEMxNCA4Ljg5NTQzIDE0Ljg5NTQgOCAxNiA4WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+';
  brandLogoSize = 'medium';
  showBrandName = true;

  // Navigation
  navigationItems: MenuItem[] = [
    { label: 'Inicio', icon: 'pi pi-home', id: 'home' },
    { label: 'Pacientes', icon: 'pi pi-users', id: 'patients' },
    { label: 'Citas', icon: 'pi pi-calendar', id: 'appointments' },
    { label: 'Reportes', icon: 'pi pi-chart-bar', id: 'reports' },
    { label: 'Configuración', icon: 'pi pi-cog', id: 'settings' }
  ];
  navigationVariant: NavigationVariant = 'horizontal';
  navigationSize: NavigationSize = 'medium';
  navigationGlassmorphic = true;

  // Notifications
  notifications = [
    {
      id: '1',
      title: 'Nueva cita',
      message: 'Tienes una nueva cita programada para hoy a las 10:00 AM',
      time: 'Hace 5 minutos',
      read: false,
      type: 'info' as 'info' | 'success' | 'warning' | 'error'
    },
    {
      id: '2',
      title: 'Resultado de laboratorio',
      message: 'Los resultados de laboratorio del paciente Juan Pérez están listos',
      time: 'Hace 30 minutos',
      read: false,
      type: 'success' as 'info' | 'success' | 'warning' | 'error'
    }
  ];
  notificationsGlassmorphic = true;

  // Search
  searchResults = [];
  searchGlassmorphic = true;

  // User Menu
  userMenuItems: MenuItem[] = [
    { label: 'Mi perfil', icon: 'pi pi-user', id: 'profile' },
    { label: 'Configuración', icon: 'pi pi-cog', id: 'settings' },
    { separator: true },
    { label: 'Cerrar sesión', icon: 'pi pi-sign-out', id: 'logout' }
  ];
  userName = 'Dr. Juan Pérez';
  userRole = 'Médico General';
  userAvatar = '';
  userMenuGlassmorphic = true;

  // Event handlers (sin cambios)
  onBrandClick(event: Event) {
    console.log('Brand clicked', event);
  }

  onNavigationItemClick(item: MenuItem) {
    console.log('Navigation item clicked', item);
  }

  onNotificationClick(notification: any) {
    console.log('Notification clicked', notification);
  }

  onMarkAllNotificationsRead() {
    console.log('All notifications marked as read');
  }

  onViewAllNotifications() {
    console.log('View all notifications');
  }

  onSearch(term: string) {
    console.log('Search term', term);
  }

  onSearchResultClick(result: any) {
    console.log('Search result clicked', result);
  }

  onUserMenuItemClick(item: MenuItem) {
    console.log('User menu item clicked', item);
  }
}
