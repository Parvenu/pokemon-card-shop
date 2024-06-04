import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ShoppingCartButtonComponent } from './components/shopping-cart-button/shopping-cart-button.component';
import { HeaderComponent } from './components/header/header.component';
import { CardListItemComponent } from './components/card-list-item/card-list-item.component';
import { FilterCardsComponent } from './components/filter-cards/filter-cards.component';
import { SearchCardsComponent } from './components/search-cards/search-cards.component';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  declarations: [
    ShoppingCartButtonComponent,
    HeaderComponent,
    CardListItemComponent,
    FilterCardsComponent,
    SearchCardsComponent,
    LogoComponent,
  ],
  imports: [SharedModule, CommonModule],
  exports: [
    ShoppingCartButtonComponent,
    HeaderComponent,
    CardListItemComponent,
    FilterCardsComponent,
    SearchCardsComponent,
    LogoComponent,
  ],
})
export class CoreModule {}
