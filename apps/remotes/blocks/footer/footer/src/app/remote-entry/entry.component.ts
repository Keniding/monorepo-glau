import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../core/components/footer/footer.component';

@Component({
  imports: [CommonModule, FooterComponent],
  selector: 'app-footer-entry',
  template: `<app-footer></app-footer>`,
})
export class RemoteEntryComponent {}
