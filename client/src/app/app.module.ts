import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTablesModule } from 'angular-datatables';
import { LayoutModule } from '../app/layout/layout.module';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { MemberloginComponent } from './memberlogin/memberlogin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookmanagmentComponent } from './bookmanagment/bookmanagment.component';
import { TableComponent } from './core/table/table.component';
import { CreatebooksComponent } from './createbooks/createbooks.component';
import { IssuedbooksadminComponent } from './issuedbooksadmin/issuedbooksadmin.component';
import { IssuedbookComponent } from './issuedbook/issuedbook.component';
import { AcceptbookadminComponent } from './acceptbookadmin/acceptbookadmin.component';
import { BookslistComponent } from './bookslist/bookslist.component';
import { UserhistoryComponent } from './userhistory/userhistory.component';
import { BookeditComponent } from './bookedit/bookedit.component';
import { HistoryadminComponent } from './historyadmin/historyadmin.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UsereditComponent } from './useredit/useredit.component';
import { UsereditadminComponent } from './usereditadmin/usereditadmin.component';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminloginComponent,
    MemberloginComponent,
    BookmanagmentComponent,
    TableComponent,
    CreatebooksComponent,
    IssuedbooksadminComponent,
    IssuedbookComponent,
    AcceptbookadminComponent,
    BookslistComponent,
    UserhistoryComponent,
    BookeditComponent,
    HistoryadminComponent,
    UserlistComponent,
    UsereditComponent,
    UsereditadminComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    BrowserAnimationsModule,
    MatDatepickerModule, 
    MatInputModule, 
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
