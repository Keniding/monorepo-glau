import { Component, Input, signal, ViewEncapsulation } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'ui-button',
  imports: [Button],
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  labelValue = signal('Button');
  iconValue = signal('');
  disabledValue = signal(false);

  @Input() set label(val: string) {
    this.labelValue.set(val);
  }

  @Input() set icon(val: string) {
    this.iconValue.set(val);
  }

  @Input() set disabled(val: boolean) {
    this.disabledValue.set(val);
  }
}
