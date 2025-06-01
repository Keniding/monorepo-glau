import { Component, Input, signal, ViewEncapsulation, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { useSkeleton } from '../../../skeletons/skeleton-factory';

@Component({
  selector: 'ui-brand',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BrandComponent {
  logoUrlValue = signal('/assets/logo.svg');
  appNameValue = signal('MedApp');
  showNameValue = signal(true);
  logoSizeValue = signal('medium'); // small, medium, large
  useSkeletonValue = signal(false);

  // Skeleton
  private readonly skeletonState = useSkeleton<boolean>(800);
  showSkeleton = this.skeletonState.loading;

  // Event emitter
  brandClicked = output<Event>();

  @Input() set logoUrl(val: string) {
    this.logoUrlValue.set(val);
  }

  @Input() set appName(val: string) {
    this.appNameValue.set(val);
  }

  @Input() set showName(val: boolean) {
    this.showNameValue.set(val);
  }

  @Input() set logoSize(val: string) {
    this.logoSizeValue.set(val);
  }

  @Input() set useSkeleton(val: boolean) {
    this.useSkeletonValue.set(val);
  }

  onClick(event: Event) {
    this.brandClicked.emit(event);
  }

  get brandClasses(): string {
    return `ui-brand ui-brand--${this.logoSizeValue()}`;
  }
}
