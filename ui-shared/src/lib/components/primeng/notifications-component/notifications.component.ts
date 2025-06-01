import { Component, Input, signal, ViewEncapsulation, output, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { useSkeleton } from '../../../skeletons/skeleton-factory';

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

@Component({
  selector: 'ui-notifications',
  standalone: true,
  imports: [CommonModule, BadgeModule, ButtonModule, SkeletonModule, TooltipModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class NotificationsComponent {
  notificationsValue = signal<Notification[]>([]);
  unreadCountValue = signal(0);
  maxDisplayValue = signal(5);
  glassmorphicValue = signal(true);
  useSkeletonValue = signal(false);
  showPanelValue = signal(false);

  @ViewChild('notificationButton') notificationButton!: ElementRef;
  @ViewChild('notificationPanel') notificationPanel!: ElementRef;

  // Skeleton
  private readonly skeletonState = useSkeleton<boolean>(800);
  showSkeleton = this.skeletonState.loading;

  // Event emitter
  notificationClicked = output<Notification>();
  allRead = output<void>();
  viewAll = output<void>();

  // Click outside handler
  private documentClickListener: any;

  @Input() set notifications(val: Notification[]) {
    this.notificationsValue.set(val);
    this.unreadCountValue.set(val.filter(n => !n.read).length);
  }

  @Input() set unreadCount(val: number) {
    this.unreadCountValue.set(val);
  }

  @Input() set maxDisplay(val: number) {
    this.maxDisplayValue.set(val);
  }

  @Input() set glassmorphic(val: boolean) {
    this.glassmorphicValue.set(val);
  }

  @Input() set useSkeleton(val: boolean) {
    this.useSkeletonValue.set(val);
  }

  ngAfterViewInit() {
    this.bindDocumentClickListener();
  }

  ngOnDestroy() {
    this.unbindDocumentClickListener();
  }

  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      this.documentClickListener = (event: Event) => {
        if (this.showPanelValue() &&
          this.notificationPanel &&
          !this.notificationPanel.nativeElement.contains(event.target) &&
          !this.notificationButton.nativeElement.contains(event.target)) {
          this.hidePanel();
          setTimeout(() => {
            this.showPanelValue.set(false);
          }, 0);
        }
      };
      document.addEventListener('click', this.documentClickListener);
    }
  }

  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      document.removeEventListener('click', this.documentClickListener);
      this.documentClickListener = null;
    }
  }

  onNotificationClick(notification: Notification, event: Event) {
    event.stopPropagation();
    this.notificationClicked.emit(notification);
    this.hidePanel();
  }

  onMarkAllRead(event: Event) {
    event.stopPropagation();
    this.allRead.emit();
  }

  onViewAll(event: Event) {
    event.stopPropagation();
    this.viewAll.emit();
    this.hidePanel();
  }

  togglePanel(event: Event) {
    event.stopPropagation();
    this.showPanelValue.update(value => !value);
  }

  hidePanel() {
    this.showPanelValue.set(false);
  }

  onKeyDown(event: KeyboardEvent, notification?: Notification) {
    if (event.key === 'Enter' && notification) {
      this.onNotificationClick(notification, event);
    } else if (event.key === 'Escape' && this.showPanelValue()) {
      this.hidePanel();
    }
  }

  get notificationsClasses(): string {
    const classes = ['ui-notifications'];

    if (this.glassmorphicValue()) classes.push('ui-notifications--glassmorphic');

    return classes.join(' ');
  }

  get displayNotifications(): Notification[] {
    return this.notificationsValue().slice(0, this.maxDisplayValue());
  }
}
