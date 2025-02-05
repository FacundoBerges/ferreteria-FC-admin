import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNavigationComponent } from './add-navigation.component';

describe('AddNavigationComponent', () => {
  let component: AddNavigationComponent;
  let fixture: ComponentFixture<AddNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
