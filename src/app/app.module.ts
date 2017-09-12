import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { CurrencyPipe } from './currency.pipe';
import { CurrencyFormatterDirective } from './currency-formatter.directive';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyPipe,
    CurrencyFormatterDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule { }
