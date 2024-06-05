import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnToTopButtonComponent } from './return-to-top-button.component';

describe('ReturnToTopButtonComponent', () => {
  let component: ReturnToTopButtonComponent;
  let fixture: ComponentFixture<ReturnToTopButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnToTopButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnToTopButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
