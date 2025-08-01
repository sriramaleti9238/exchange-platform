import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideKeycloakAngular } from './app/keycloak.config';
import { provideRouter } from '@angular/router';
import { AppRoutingModule, routes } from './app/app-routing.module';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { includeBearerTokenInterceptor } from 'keycloak-angular';
import { provideStore } from '@ngrx/store';
import { ticketReducers } from './app/tickets/state/ticket.reducers';
import { accountReducers } from './app/accounts/state/account.reducers';
import { propertyReducers } from './app/properties/state/properties.reducers';
import { messageReducers } from './app/messages/state/message.reducers';
import { rateReducers } from './app/rates/state/rate.reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideTranslateService, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { utilReducers } from './app/utils/state/util.reducers';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
  http: HttpClient
) => new TranslateHttpLoader(http, './assets/i18n/', '.json');

bootstrapApplication(AppComponent, {
  providers: [
    provideKeycloakAngular(),
    importProvidersFrom(BrowserModule, AppRoutingModule, TranslatePipe),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
    provideAnimations(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
    provideStore({
      tickets: ticketReducers,
      accounts: accountReducers,
      properties: propertyReducers,
      messages: messageReducers,
      rates: rateReducers,
      utils: utilReducers
    }),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      traceLimit: 75,
      connectInZone: true
    }),
    provideToastr({
      timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    })
  ]
}).catch((err) => console.error(err));
