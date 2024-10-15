import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app/app.routes';
import { formReducer } from './app/store/form/form.reducer';
import { FormEffects } from './app/store/form/form.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideStore({
      router: routerReducer,
      form: formReducer
    }),
    provideEffects([FormEffects]),
    provideRouterStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: false })
  ]
}).catch(err => console.error(err));