import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferMenuComponent } from './transfer-menu.component';

describe('TransferMenuComponent', () => {
  let component: TransferMenuComponent;
  let fixture: ComponentFixture<TransferMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
