import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfCreateComponent } from './shelf-create.component';

describe('ShelfCreateComponent', () => {
  let component: ShelfCreateComponent;
  let fixture: ComponentFixture<ShelfCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelfCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelfCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
