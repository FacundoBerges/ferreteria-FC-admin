import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsTableComponent } from './brands-table.component';

describe('BrandsTableComponent', () => {
  let component: BrandsTableComponent;
  let fixture: ComponentFixture<BrandsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
