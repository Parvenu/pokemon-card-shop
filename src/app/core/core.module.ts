import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ShoppingCartButtonComponent } from './components/shopping-cart-button/shopping-cart-button.component';
import { HeaderComponent } from './components/header/header.component';
import { CardListItemComponent } from './components/card-list-item/card-list-item.component';
import { FilterTypesService } from './services/filter-data.service';
import { CardService } from './services/card.service';

@NgModule({
    declarations: [ShoppingCartButtonComponent, HeaderComponent, CardListItemComponent],
    imports: [
      SharedModule,
      CommonModule
    ],
    exports: [ShoppingCartButtonComponent, HeaderComponent, CardListItemComponent],
    providers: [CardService, FilterTypesService]
  })
  export class CoreModule {}