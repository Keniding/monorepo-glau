import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { MenuItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import {
  BrandComponent,
  ButtonComponent,
  NavigationComponent,
  NotificationsComponent,
  SearchComponent,
  UserMenuComponent,
  ButtonVariant,
  ButtonSize,
  NavigationVariant,
  NavigationSize,
  Notification,
  SearchResult
} from '@shared/ui-shared';

@Component({
  selector: 'app-components-showcase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    ButtonComponent,
    BrandComponent,
    NavigationComponent,
    NotificationsComponent,
    SearchComponent,
    UserMenuComponent,
    CheckboxModule,
    SelectButtonModule,
    CardModule,
    DividerModule
  ],
  templateUrl: './components-showcase.component.html',
  styleUrls: ['./components-showcase.component.scss']
})
export class ComponentsShowcaseComponent {
  // Brand Component
  brandLogoSizes = [
    { label: 'Pequeño', value: 'small' },
    { label: 'Mediano', value: 'medium' },
    { label: 'Grande', value: 'large' }
  ];
  selectedBrandLogoSize = 'medium';
  showBrandName = true;
  useBrandSkeleton = false;

  // Navigation Component
  navigationItems: MenuItem[] = [
    { label: 'Inicio', icon: 'pi pi-home', id: 'home' },
    { label: 'Pacientes', icon: 'pi pi-users', id: 'patients' },
    { label: 'Citas', icon: 'pi pi-calendar', id: 'appointments' },
    { label: 'Reportes', icon: 'pi pi-chart-bar', id: 'reports' },
    { label: 'Configuración', icon: 'pi pi-cog', id: 'settings' }
  ];
  navigationVariants = [
    { label: 'Horizontal', value: 'horizontal' },
    { label: 'Vertical', value: 'vertical' }
  ];
  navigationSizes = [
    { label: 'Pequeño', value: 'small' },
    { label: 'Mediano', value: 'medium' },
    { label: 'Grande', value: 'large' }
  ];
  selectedNavigationVariant: NavigationVariant = 'horizontal';
  selectedNavigationSize: NavigationSize = 'medium';
  navigationGlassmorphic = true;
  useNavigationSkeleton = false;

  // Notifications Component
  notifications: Notification[] = [
    {
      id: '1',
      title: 'Nueva cita',
      message: 'Tienes una nueva cita programada para mañana a las 10:00 AM',
      time: 'Hace 5 minutos',
      read: false,
      type: 'info'
    },
    {
      id: '2',
      title: 'Resultado de laboratorio',
      message: 'Los resultados de laboratorio del paciente Juan Pérez están listos',
      time: 'Hace 30 minutos',
      read: false,
      type: 'success'
    },
    {
      id: '3',
      title: 'Recordatorio',
      message: 'Recordatorio: Reunión de personal a las 3:00 PM',
      time: 'Hace 1 hora',
      read: true,
      type: 'warning'
    },
    {
      id: '4',
      title: 'Error en el sistema',
      message: 'Se ha producido un error al cargar los datos del paciente',
      time: 'Hace 2 horas',
      read: true,
      type: 'error'
    }
  ];
  notificationsGlassmorphic = true;
  useNotificationsSkeleton = false;

  // Search Component
  searchResults: SearchResult[] = [
    {
      id: '1',
      title: 'Juan Pérez',
      description: 'Paciente - ID: 12345',
      url: '/patients/12345',
      type: 'Paciente'
    },
    {
      id: '2',
      title: 'Consulta médica',
      description: 'Tipo de cita - Duración: 30 minutos',
      url: '/appointments/types/1',
      type: 'Cita'
    },
    {
      id: '3',
      title: 'Reporte mensual',
      description: 'Reporte de actividad - Mayo 2023',
      url: '/reports/monthly/2023-05',
      type: 'Reporte'
    }
  ];
  searchExpanded = false;
  searchGlassmorphic = true;
  searchLoading = false;
  useSearchSkeleton = false;

  // User Menu Component
  userMenuItems: MenuItem[] = [
    { label: 'Mi perfil', icon: 'pi pi-user', id: 'profile' },
    { label: 'Configuración', icon: 'pi pi-cog', id: 'settings' },
    { label: 'Mensajes', icon: 'pi pi-envelope', id: 'messages' },
    { separator: true },
    { label: 'Cerrar sesión', icon: 'pi pi-sign-out', id: 'logout' }
  ];
  showUserName = true;
  showUserRole = true;
  userMenuGlassmorphic = true;
  useUserMenuSkeleton = false;

  // Button Component
  buttonVariants = [
    { label: 'Primario', value: 'primary' },
    { label: 'Secundario', value: 'secondary' },
    { label: 'Éxito', value: 'success' },
    { label: 'Advertencia', value: 'warning' },
    { label: 'Peligro', value: 'danger' },
    { label: 'Info', value: 'info' },
    { label: 'Texto', value: 'text' }
  ];
  buttonSizes = [
    { label: 'Pequeño', value: 'small' },
    { label: 'Mediano', value: 'medium' },
    { label: 'Grande', value: 'large' }
  ];
  selectedButtonVariant: ButtonVariant = 'primary';
  selectedButtonSize: ButtonSize = 'medium';
  buttonRounded = false;
  buttonOutlined = false;
  buttonFullWidth = false;
  buttonDisabled = false;
  buttonLoading = false;
  buttonIcon = '';
  buttonLabel = 'Botón';
  useButtonSkeleton = false;

  // Header Showcase
  headerGlassmorphic = true;

  // Event handlers
  onBrandClick(event: Event) {
    console.log('Brand clicked', event);
  }

  onNavigationItemClick(item: MenuItem) {
    console.log('Navigation item clicked', item);
  }

  onNotificationClick(notification: Notification) {
    console.log('Notification clicked', notification);
  }

  onMarkAllNotificationsRead() {
    this.notifications = this.notifications.map(n => ({ ...n, read: true }));
    console.log('All notifications marked as read');
  }

  onViewAllNotifications() {
    console.log('View all notifications');
  }

  onSearch(term: string) {
    console.log('Search term', term);
    // Simulación de búsqueda
    this.searchLoading = true;
    setTimeout(() => {
      this.searchLoading = false;
    }, 1000);
  }

  onSearchResultClick(result: SearchResult) {
    console.log('Search result clicked', result);
  }

  onUserMenuItemClick(item: MenuItem) {
    console.log('User menu item clicked', item);
  }

  onProfileClick(event: Event) {
    console.log('Profile clicked', event);
  }

  onButtonClick(event: Event) {
    console.log('Button clicked', event);
  }
}
