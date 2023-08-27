import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartButtonComponent } from './shopping-cart-button.component';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartButtonComponent;
  let fixture: ComponentFixture<ShoppingCartButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingCartButtonComponent]
    });
    fixture = TestBed.createComponent(ShoppingCartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
