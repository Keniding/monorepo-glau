import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentsShowcaseComponent } from './components-showcase.component';

describe('ComponentsShowcaseComponent', () => {
  let component: ComponentsShowcaseComponent;
  let fixture: ComponentFixture<ComponentsShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsShowcaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentsShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
