import { Component, OnInit, OnDestroy, signal, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    ButtonModule,
    ProgressSpinnerModule,
    ToastModule,
    CardModule,
    DividerModule,
    TagModule,
    SkeletonModule,
    PanelModule
  ],
  providers: [MessageService],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

// Estados de carga de los microfrontends
  headerLoaded = signal(false);
  footerLoaded = signal(false);
  isLoading = signal(true);
  loadingError = signal<string | null>(null);

// Referencias a los componentes remotos
  headerComponent: any = null;
  footerComponent: any = null;

  constructor(
    private router: Router,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    await this.loadRemoteModules();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private async loadRemoteModules() {
    try {
      this.isLoading.set(true);
      this.loadingError.set(null);

      // Mostrar mensaje de carga
      this.messageService.add({
        severity: 'info',
        summary: 'Cargando',
        detail: 'Inicializando microfrontends...',
        life: 2000
      });

      // Cargar header y footer en paralelo
      const results = await Promise.allSettled([
        this.loadHeaderModule(),
        this.loadFooterModule()
      ]);

      // Verificar si alguno falló
      const failures = results.filter(result => result.status === 'rejected');
      if (failures.length > 0) {
        console.warn('Some remote modules failed to load:', failures);
        this.messageService.add({
          severity: 'warn',
          summary: 'Advertencia',
          detail: `${failures.length} módulo(s) no se pudieron cargar`,
          life: 3000
        });
      } else {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Todos los módulos cargados correctamente',
          life: 2000
        });
      }

      this.isLoading.set(false);
    } catch (error) {
      console.error('Error loading remote modules:', error);
      this.loadingError.set('Error al cargar los módulos remotos');
      this.isLoading.set(false);

      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al cargar los módulos remotos',
        life: 5000
      });
    }
  }

  private async loadHeaderModule() {
    try {
      console.log('Loading header module...');

      // Intentar cargar el componente directamente
      const headerModule = await import('header/Component');

      if (headerModule?.HeaderComponent) {
        this.headerComponent = headerModule.HeaderComponent;
        this.headerLoaded.set(true);
        console.log('Header component loaded successfully');
        return;
      }

      // Fallback: intentar cargar las rutas
      const headerRoutes = await import('header/Routes');
      if (headerRoutes?.remoteRoutes) {
        this.headerComponent = headerRoutes.remoteRoutes;
        this.headerLoaded.set(true);
        console.log('Header routes loaded successfully');
        return;
      }

      throw new Error('No header module found');
    } catch (error) {
      console.error('Error loading header module:', error);
      this.headerLoaded.set(false);
      throw error;
    }
  }

  private async loadFooterModule() {
    try {
      console.log('Loading footer module...');

      // Intentar cargar el componente directamente
      const footerModule = await import('footer/Component');

      if (footerModule?.FooterComponent) {
        this.footerComponent = footerModule.FooterComponent;
        this.footerLoaded.set(true);
        console.log('Footer component loaded successfully');
        return;
      }

      // Fallback: intentar cargar las rutas
      const footerRoutes = await import('footer/Routes');
      if (footerRoutes?.remoteRoutes) {
        this.footerComponent = footerRoutes.remoteRoutes;
        this.footerLoaded.set(true);
        console.log('Footer routes loaded successfully');
        return;
      }

      throw new Error('No footer module found');
    } catch (error) {
      console.error('Error loading footer module:', error);
      this.footerLoaded.set(false);
      throw error;
    }
  }

// Método para recargar módulos remotos
  async reloadRemoteModules() {
    this.headerLoaded.set(false);
    this.footerLoaded.set(false);
    await this.loadRemoteModules();
  }

// Navegar a rutas específicas
  navigateToHeader() {
    this.router.navigate(['/header']);
  }

  navigateToFooter() {
    this.router.navigate(['/footer']);
  }

  navigateToLibrary() {
    this.router.navigate(['/library']);
  }

  navigateToWelcome() {
    this.router.navigate(['/NxWelcome']);
  }

// Handlers para eventos de los microfrontends
  onHeaderEvent(event: any) {
    console.log('Header event received:', event);
    this.messageService.add({
      severity: 'info',
      summary: 'Evento Header',
      detail: `Acción: ${event.action || 'desconocida'}`,
      life: 2000
    });
  }

  onFooterEvent(event: any) {
    console.log('Footer event received:', event);
    this.messageService.add({
      severity: 'info',
      summary: 'Evento Footer',
      detail: `Acción: ${event.action || 'desconocida'}`,
      life: 2000
    });
  }

  protected readonly isDevMode = isDevMode;
}
