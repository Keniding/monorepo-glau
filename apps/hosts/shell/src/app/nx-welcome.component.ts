import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@shared/ui-shared';

@Component({
  selector: 'app-nx-welcome',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="button-showcase">
      <h3>Botones básicos</h3>
      <div class="button-row">
        <ui-button label="Botón primario"></ui-button>
        <ui-button label="Botón secundario" variant="secondary"></ui-button>
        <ui-button label="Botón éxito" variant="success"></ui-button>
        <ui-button label="Botón advertencia" variant="warning"></ui-button>
        <ui-button label="Botón peligro" variant="danger"></ui-button>
        <ui-button label="Botón info" variant="info"></ui-button>
      </div>

      <h3>Estados</h3>
      <div class="button-row">
        <ui-button label="Cargando..." [loading]="true"></ui-button>
        <ui-button label="Deshabilitado" [disabled]="true"></ui-button>
        <ui-button label="Con icono" icon="pi pi-check"></ui-button>
      </div>

      <h3>Variantes</h3>
      <div class="button-row">
        <ui-button label="Contorno" [outlined]="true"></ui-button>
        <ui-button label="Redondeado" [rounded]="true"></ui-button>
        <ui-button label="Ancho completo" [fullWidth]="true"></ui-button>
      </div>

      <h3>Tamaños</h3>
      <div class="button-row">
        <ui-button label="Pequeño" size="small"></ui-button>
        <ui-button label="Mediano" size="medium"></ui-button>
        <ui-button label="Grande" size="large"></ui-button>
      </div>

      <h3>Skeleton</h3>
      <div class="button-row">
        <ui-button label="Con skeleton" [useSkeleton]="true"></ui-button>
      </div>
    </div>
  `,
  styles: [`
    .button-showcase {
      padding: 1rem;
    }

    .button-row {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 2rem;
    }
  `]
})
export class NxWelcomeComponent {}
