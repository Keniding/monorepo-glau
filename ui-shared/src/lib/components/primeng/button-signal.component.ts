import { Component, Input, signal } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'ui-button-signal',
  standalone: true,
  imports: [Button],
  template: `
    <p-button
      [label]="labelSignal()"
      [disabled]="disabledSignal()"
      [icon]="iconSignal()"
    />
  `,
})
export class UIButtonSignal {
  private readonly _label = signal('');
  private readonly _icon = signal('');
  private readonly _disabled = signal(false);

  @Input() set label(val: string) {
    this._label.set(val);
  }
  labelSignal = this._label.asReadonly();

  @Input() set icon(val: string) {
    this._icon.set(val);
  }
  iconSignal = this._icon.asReadonly();

  @Input() set disabled(val: boolean) {
    this._disabled.set(val);
  }
  disabledSignal = this._disabled.asReadonly();
}
