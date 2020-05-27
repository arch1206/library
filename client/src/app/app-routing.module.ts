import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { MemberloginComponent } from './memberlogin/memberlogin.component'; 
import { Authadmin } from './authadmin.guard';
import { Authmember} from './authmember.guard';
import { BookmanagmentComponent } from './bookmanagment/bookmanagment.component';
import { TableComponent } from './core/table/table.component';
import { CreatebooksComponent } from './createbooks/createbooks.component';
import { BookslistComponent } from './bookslist/bookslist.component';
import { BookeditComponent } from './bookedit/bookedit.component';
import { AcceptbookadminComponent } from './acceptbookadmin/acceptbookadmin.component';
import { IssuedbooksadminComponent } from './issuedbooksadmin/issuedbooksadmin.component';
import { IssuedbookComponent } from './issuedbook/issuedbook.component';
import { UserhistoryComponent } from './userhistory/userhistory.component';
import { HistoryadminComponent } from './historyadmin/historyadmin.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UsereditComponent } from './useredit/useredit.component';
import { UsereditadminComponent } from './usereditadmin/usereditadmin.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path:'login',
    component:MemberloginComponent
  },
  {
    path:"",
    component:LayoutComponent,
    canActivate:[Authmember],

    children:[
      {
        path:"dashboard",
        component:DashboardComponent

      },

      {
          path: 'books',
          component:BookslistComponent
      },
      {
        path: 'issued/:id',
        component:IssuedbookComponent
      },
      {
        path:'history/:id',
        component:UserhistoryComponent
      },
      {
        path:'edit',
        component:UsereditComponent
      }
    ]
  },
  {
    path:"libadmin",
    component:AdminloginComponent
  },
  {
    path:"libadmin",
    canActivate:[Authadmin],
    component:LayoutComponent,
    children:[
      { path: 'dashboard',
      component:DashboardComponent},
      {
        path: 'book',
        component:BookmanagmentComponent
      },
      {
        path: 'book/create',
        component:CreatebooksComponent
      },
      {
        path:'book/edit/:id',
        component:BookeditComponent
      },
      {
        path:'issuerequest',
        component:AcceptbookadminComponent
      },
      {
        path:"issuedbooks",
        component:IssuedbooksadminComponent
      },
      {
        path:"history",
        component:HistoryadminComponent
      },
      {
        path:"users",
        component:UserlistComponent
      },
      {
        path:"users/:id",
        component:UsereditadminComponent
      }
    ]
  },
  {
    path:"12",

    component:LayoutComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
