import { BrowserModule } from '@angular/platform-browser';
import { NgModule, TRANSLATIONS, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';

export const APP_ID = 'my-app';

declare const require: any; // maybe required, maybe not

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: APP_ID })
  ],
  providers: [
    {
      provide: TRANSLATIONS,
      useFactory: (locale) => {
        locale = locale || 'en'; // default to english if no locale is provided
        // return require(`raw-loader!../i18n/messages.${locale}.xlf`); <= should be this, but it throws an error that raw-loader is not found
        return require(`../i18n/messages.${locale}.xlf`); // same error happening as in issue even without raw-loader, although we probably will need it to load this file
      },
      deps: [LOCALE_ID]
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
