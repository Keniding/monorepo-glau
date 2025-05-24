import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { ChartModule } from 'primeng/chart';
import { TagModule } from 'primeng/tag';
import { TimelineModule } from 'primeng/timeline';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    SkeletonModule,
    ChipModule,
    DividerModule,
    ImageModule,
    ChartModule,
    TagModule,
    TimelineModule,
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  chartData: any;
  chartOptions: any;
  timelineEvents: any[] | undefined;
  imagesLoaded: {[key: string]: boolean} = {};
  imagesError: {[key: string]: boolean} = {};
  loadingTimeout = 3000;

  // Lista de imágenes para controlar su carga
  imageUrls = [
    'assets/images/retina-scan.png',
    'assets/images/team/member1.jpg',
    'assets/images/team/member2.jpg',
    'assets/images/team/member3.jpg',
    'assets/images/team/member4.jpg'
  ];

  constructor() {
    // Inicializar el estado de carga de cada imagen
    this.imageUrls.forEach(url => {
      this.imagesLoaded[url] = false;
      this.imagesError[url] = false;
    });

    this.initChartData();
    this.initTimelineData();
  }

  ngOnInit(): void {
    // Precargar imágenes para verificar si existen
    this.preloadImages();

    // Establecer un tiempo máximo para mostrar el skeleton
    setTimeout(() => {
      this.imageUrls.forEach(url => {
        if (!this.imagesLoaded[url] && !this.imagesError[url]) {
          this.imagesError[url] = true; // Marcar como error si no se cargó después del timeout
        }
      });
    }, this.loadingTimeout);
  }

  preloadImages(): void {
    this.imageUrls.forEach(url => {
      const img = new Image();

      img.onload = () => {
        this.imagesLoaded[url] = true;
      };

      img.onerror = () => {
        this.imagesError[url] = true;
      };

      img.src = url;
    });
  }

  // Método para verificar si una imagen está lista para mostrar
  isImageReady(url: string): boolean {
    return this.imagesLoaded[url] && !this.imagesError[url];
  }

  // Método para verificar si se debe mostrar el skeleton
  shouldShowSkeleton(url: string): boolean {
    return !this.imagesLoaded[url] && !this.imagesError[url];
  }

  // Método para verificar si se debe mostrar una imagen de reemplazo
  shouldShowFallback(url: string): boolean {
    return this.imagesError[url];
  }

  // Método para manejar el error de imagen en el componente p-image
  handleImageError(url: string, event: Event): void {
    this.imagesError[url] = true;
  }

  initChartData() {
    this.chartData = {
      labels: ['2021', '2022', '2023', '2024', '2025'],
      datasets: [
        {
          label: 'Precisión del Modelo',
          data: [91, 93, 95, 97, 98],
          fill: false,
          borderColor: '#4F46E5',
          tension: 0.4,
        },
        {
          label: 'Casos Detectados',
          data: [65, 72, 78, 85, 92],
          fill: false,
          borderColor: '#10B981',
          tension: 0.4,
        },
      ],
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
    };
  }

  initTimelineData() {
    this.timelineEvents = [
      {
        status: 'Fase Alfa',
        date: 'Análisis y Diseño',
        description: 'Arquitectura de microservicios y micro-frontends',
      },
      {
        status: 'Fase Beta',
        date: 'Modelo IA',
        description: 'Implementación de ResNet50 con transfer learning',
      },
      {
        status: 'Fase Teta',
        date: 'Backend',
        description: 'Desarrollo de microservicios en Spring Framework',
      },
      {
        status: 'Fase Lanmda',
        date: 'Frontend',
        description: 'Implementación de interfaces en Angular',
      },
      {
        status: 'Fase Omega',
        date: 'Despliegue',
        description: 'Evaluación clínica y optimización continua',
      },
    ];
  }

  getSeverity(status: string): string {
    switch (status) {
      case 'Fase 1':
        return 'info';
      case 'Fase 2':
        return 'success';
      case 'Fase 3':
        return 'warning';
      case 'Fase 4':
        return 'danger';
      case 'Fase 5':
        return 'primary';
      default:
        return 'info';
    }
  }
}
