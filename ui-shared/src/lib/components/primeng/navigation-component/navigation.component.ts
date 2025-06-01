import { Component, Input, signal, ViewEncapsulation, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { useSkeleton } from '../../../skeletons/skeleton-factory';

export type NavigationVariant = 'horizontal' | 'vertical';
export type NavigationSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'ui-navigation',
  standalone: true,
  imports: [CommonModule, MenubarModule, SkeletonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class NavigationComponent {
  itemsValue = signal<MenuItem[]>([]);
  variantValue = signal<NavigationVariant>('horizontal');
  sizeValue = signal<NavigationSize>('medium');
  glassmorphicValue = signal(true);
  activeItemValue = signal<string | null>(null);
  useSkeletonValue = signal(false);

  // Skeleton
  private readonly skeletonState = useSkeleton<boolean>(800);
  showSkeleton = this.skeletonState.loading;

  // Event emitter
  itemSelected = output<MenuItem>();

  @Input() set items(val: MenuItem[]) {
    const itemsWithClickHandler = val.map(item => ({
      ...item,
      command: () => this.onMenuItemClick(item)
    }));
    this.itemsValue.set(itemsWithClickHandler);
  }

  @Input() set variant(val: NavigationVariant) {
    this.variantValue.set(val);
  }

  @Input() set size(val: NavigationSize) {
    this.sizeValue.set(val);
  }

  @Input() set glassmorphic(val: boolean) {
    this.glassmorphicValue.set(val);
  }

  @Input() set activeItem(val: string | null) {
    this.activeItemValue.set(val);
  }

  @Input() set useSkeleton(val: boolean) {
    this.useSkeletonValue.set(val);
  }

  onMenuItemClick(item: MenuItem) {
    this.itemSelected.emit(item);
  }

  get navigationClasses(): string {
    const classes = [
      'ui-navigation',
      `ui-navigation--${this.variantValue()}`,
      `ui-navigation--${this.sizeValue()}`
    ];

    if (this.glassmorphicValue()) classes.push('ui-navigation--glassmorphic');

    return classes.join(' ');
  }
}
