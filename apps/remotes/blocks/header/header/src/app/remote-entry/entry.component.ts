import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../core/components/header.component';

@Component({
  imports: [CommonModule, HeaderComponent],
  selector: 'app-header-entry',
  template: `<app-header></app-header>`,
})
export class RemoteEntryComponent {}
