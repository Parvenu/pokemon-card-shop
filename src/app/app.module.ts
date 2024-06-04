import { NgModule, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { CoreModule } from './core/core.module';
import { ReduxStoreModule } from './redux-store/redux-store.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    CoreModule,
    ReduxStoreModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideExperimentalZonelessChangeDetection(),
    provideClientHydration(),
    // provideClientHydration(withEventReplay()), // bugged ?
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
