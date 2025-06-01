import { Component, Input, signal, ViewEncapsulation, output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule, Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { useSkeleton } from '../../../skeletons/skeleton-factory';

@Component({
  selector: 'ui-user-menu',
  standalone: true,
  imports: [CommonModule, AvatarModule, MenuModule, ButtonModule, SkeletonModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UserMenuComponent {
  @ViewChild('menu') menu!: Menu;

  userNameValue = signal('John Doe');
  userAvatarValue = signal('');
  userRoleValue = signal('Admin');
  menuItemsValue = signal<MenuItem[]>([]);
  showNameValue = signal(true);
  showRoleValue = signal(true);
  glassmorphicValue = signal(true);
  useSkeletonValue = signal(false);

  // Skeleton
  private readonly skeletonState = useSkeleton<boolean>(800);
  showSkeleton = this.skeletonState.loading;

  // Event emitter
  menuItemSelected = output<MenuItem>();
  profileClicked = output<Event>();

  @Input() set userName(val: string) {
    this.userNameValue.set(val);
  }

  @Input() set userAvatar(val: string) {
    this.userAvatarValue.set(val);
  }

  @Input() set userRole(val: string) {
    this.userRoleValue.set(val);
  }

  @Input() set menuItems(val: MenuItem[]) {
    const itemsWithCommands = val.map(item => ({
      ...item,
      command: () => {
        this.menuItemSelected.emit(item);
      }
    }));
    this.menuItemsValue.set(itemsWithCommands);
  }

  @Input() set showName(val: boolean) {
    this.showNameValue.set(val);
  }

  @Input() set showRole(val: boolean) {
    this.showRoleValue.set(val);
  }

  @Input() set glassmorphic(val: boolean) {
    this.glassmorphicValue.set(val);
  }

  @Input() set useSkeleton(val: boolean) {
    this.useSkeletonValue.set(val);
  }

  onProfileClick(event: Event) {
    this.profileClicked.emit(event);
    this.toggleMenu(event);
  }

  toggleMenu(event: Event) {
    if (this.menu) {
      this.menu.toggle(event);
    }
  }

  get userMenuClasses(): string {
    const classes = ['ui-user-menu'];

    if (this.glassmorphicValue()) classes.push('ui-user-menu--glassmorphic');

    return classes.join(' ');
  }

  get initials(): string {
    const name = this.userNameValue();
    if (!name) return 'U';

    const parts = name.trim().split(' ').filter(part => part.length > 0);
    if (parts.length >= 2) {
      return `${parts[0].charAt(0).toUpperCase()}${parts[parts.length - 1].charAt(0).toUpperCase()}`;
    }
    return name.charAt(0).toUpperCase();
  }
}
