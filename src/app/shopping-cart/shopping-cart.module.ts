import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardService } from '../core/services/card.service';
import { SharedModule } from '../shared/shared.module';
import { ShoppingCartComponent } from './shopping-cart.component';
import { CoreModule } from '../core/core.module';

const routes: Routes = [
    {
      path: '',
      component: ShoppingCartComponent,
    }
  ];

@NgModule({
    declarations:[
        ShoppingCartComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CoreModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule, ShoppingCartComponent],
    providers: [
      CardService
    ]
  })
  export class ShoppingCartModule {}