import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globleservices } from 'src/services/globleservices';

@Component({
  selector: 'app-bookmanagment',
  templateUrl: './bookmanagment.component.html',
  styleUrls: ['./bookmanagment.component.css']
})
export class BookmanagmentComponent implements OnInit {
  defaultContent
  bookdata={
    modulename:"book",
    tabletitle:"Book List",
    createbtnurl:"create",
    createbtntitle:"Add New Books",
    buttons:[
      {title:"Manage",icon:"fas fa-edit", class:"btn btn-primary",type:"manage"},
      // {title:"Delete",icon:"fas fa-trash", class:"btn btn-danger",type:"delete", permission:"faculty.center.delete"}
    ],
    columns:[
      {name:"title",lable:"Title"},
      {name:"author",lable:"author"},
      {name:"isbn",lable:"ISBN"},
      // {name:"created_at",lable:"Created At"},
      // {name:"status",lable:"Status"},
      {name:'action',lable:"Actions"}]
  };
  constructor(private service:Globleservices, private router:Router) { 
    this.service.getAll("book",(res)=>{
      this.bookdata['data']=res;
      console.log(res)
    });
  }

  ngOnInit() {
  }
  actionTable(data)
  {
    console.log(data)
    this.router.navigate(['/libadmin/book/edit/'+data.data[3]]);
  }

}
