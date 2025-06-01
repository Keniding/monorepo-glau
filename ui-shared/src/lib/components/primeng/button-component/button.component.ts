import { Component, Input, signal, ViewEncapsulation, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, ButtonSeverity } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { useSkeleton } from '../../../skeletons/skeleton-factory';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'text';

const severityMap: Record<ButtonVariant, ButtonSeverity> = {
  'primary': 'primary',
  'secondary': 'secondary',
  'success': 'success',
  'warning': 'warn',
  'danger': 'danger',
  'info': 'info',
  'text': 'help'
};

export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [ButtonModule, CommonModule, SkeletonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  labelValue = signal('Button');
  iconValue = signal('');
  disabledValue = signal(false);
  loadingValue = signal(false);
  variantValue = signal<ButtonVariant>('primary');
  sizeValue = signal<ButtonSize>('medium');
  fullWidthValue = signal(false);
  roundedValue = signal(false);
  outlinedValue = signal(false);
  useSkeletonValue = signal(false);
  skeletonHeightValue = signal('2.5rem');
  skeletonWidthValue = signal('8rem');

  // Event emitter
  clicked = output<Event>();

  // Skeleton
  private readonly skeletonState = useSkeleton<boolean>(800);
  showSkeleton = this.skeletonState.loading;

  @Input() set label(val: string) {
    this.labelValue.set(val);
  }

  @Input() set icon(val: string) {
    this.iconValue.set(val);
  }

  @Input() set disabled(val: boolean) {
    this.disabledValue.set(val);
  }

  @Input() set loading(val: boolean) {
    this.loadingValue.set(val);
  }

  @Input() set variant(val: ButtonVariant) {
    this.variantValue.set(val);
  }

  @Input() set size(val: ButtonSize) {
    this.sizeValue.set(val);
  }

  @Input() set fullWidth(val: boolean) {
    this.fullWidthValue.set(val);
  }

  @Input() set rounded(val: boolean) {
    this.roundedValue.set(val);
  }

  @Input() set outlined(val: boolean) {
    this.outlinedValue.set(val);
  }

  @Input() set useSkeleton(val: boolean) {
    this.useSkeletonValue.set(val);
  }

  @Input() set skeletonHeight(val: string) {
    this.skeletonHeightValue.set(val);
  }

  @Input() set skeletonWidth(val: string) {
    this.skeletonWidthValue.set(val);
  }

  onClick(event: Event) {
    if (!this.disabledValue() && !this.loadingValue()) {
      this.clicked.emit(event);
    }
  }

  get severity(): ButtonSeverity {
    return severityMap[this.variantValue()];
  }

  get buttonClasses(): string {
    const classes = [
      `ui-button--${this.sizeValue()}`,
    ];

    if (this.fullWidthValue()) classes.push('ui-button--full-width');

    return classes.join(' ');
  }
}
