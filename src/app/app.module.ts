import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbTooltipModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { ContentComponent } from './content/content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import {  MatDialogModule } from '@angular/material/dialog';
import { FooterComponent } from './footer/footer.component';
import { TabsComponent } from './content/tabs/tabs.component';
import { DescComponent } from './content/desc/desc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './content/form/form.component';
import  {MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { DealerDetailComponent } from './content/dealer-detail/dealer-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    ContentComponent,
    FooterComponent,
    TabsComponent,
    DescComponent,
    FormComponent,
    DealerDetailComponent
  ],
  imports: [
    BrowserModule,
    NgbTooltipModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModalModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
    FlexLayoutModule,
    // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatChipsModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
