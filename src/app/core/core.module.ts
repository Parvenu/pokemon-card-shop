import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ShoppingCartButtonComponent } from './components/shopping-cart-button/shopping-cart-button.component';
import { HeaderComponent } from './components/header/header.component';
import { CardListItemComponent } from './components/card-list-item/card-list-item.component';
import { FilterCardsComponent } from './components/filter-cards/filter-cards.component';
import { SearchCardsComponent } from './components/search-cards/search-cards.component';
import { LogoComponent } from './components/logo/logo.component';
import { CardListItemPlaceholderComponent } from './components/card-list-item/placeholder/card-list-item-placeholder.component';
import { ReturnToTopButtonComponent } from './components/return-to-top-button/return-to-top-button.component';

@NgModule({
  declarations: [
    ShoppingCartButtonComponent,
    HeaderComponent,
    CardListItemComponent,
    CardListItemPlaceholderComponent,
    FilterCardsComponent,
    SearchCardsComponent,
    LogoComponent,
    ReturnToTopButtonComponent,
  ],
  imports: [SharedModule, CommonModule],
  exports: [
    ShoppingCartButtonComponent,
    HeaderComponent,
    CardListItemComponent,
    CardListItemPlaceholderComponent,
    FilterCardsComponent,
    SearchCardsComponent,
    LogoComponent,
    ReturnToTopButtonComponent,
  ],
})
export class CoreModule {}
