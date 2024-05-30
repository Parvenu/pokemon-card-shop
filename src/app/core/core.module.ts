import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ShoppingCartButtonComponent } from './components/shopping-cart-button/shopping-cart-button.component';
import { HeaderComponent } from './components/header/header.component';
import { CardListItemComponent } from './components/card-list-item/card-list-item.component';
import { FilterCardsComponent } from './components/filter-cards/filter-cards.component';
import { SearchCardsComponent } from './components/search-cards/search-cards.component';

@NgModule({
  declarations: [
    ShoppingCartButtonComponent,
    HeaderComponent,
    CardListItemComponent,
    FilterCardsComponent,
    SearchCardsComponent,
  ],
  imports: [SharedModule, CommonModule],
  exports: [
    ShoppingCartButtonComponent,
    HeaderComponent,
    CardListItemComponent,
    FilterCardsComponent,
    SearchCardsComponent,
  ],
})
export class CoreModule {}
