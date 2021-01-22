import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';

/**
 * MODULES
 */
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './modules/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './modules/ng-material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

/**
 * NGRX
 */
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

/**
 * PAGES
 */
import { HomeComponent } from './pages/home/home.component';

/**
 * COMPONENTS
 */
import { HeaderComponent } from './components/header/header.component';
import { DeleteDialogComponent, EditTacoComponent } from './components/edit-taco/edit-taco.component';
import { RecipeItemsComponent } from './components/recipe-items/recipe-items.component';
import { ToastComponent } from './components/toast/toast.component';
import { HttpService } from './services/http.service';
import { TacoService } from './services/taco.service';
import { ToastService } from './services/toast.service';
import { reducers } from './store';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditTacoComponent,
    HeaderComponent,
    RecipeItemsComponent,
    DeleteDialogComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    HttpClientModule,
    FormsModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forRoot(reducers)
  ],
  providers: [HttpService, TacoService, ToastService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
