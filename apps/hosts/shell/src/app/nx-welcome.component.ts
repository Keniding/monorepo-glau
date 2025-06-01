import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@shared/ui-shared';

@Component({
  selector: 'app-nx-welcome',
  imports: [CommonModule, ButtonComponent],
  template: `
    <ui-button
      label="Click Me"
      icon="pi pi-check"
      [disabled]="false"
    ></ui-button>
  `,
})
export class NxWelcomeComponent {}
