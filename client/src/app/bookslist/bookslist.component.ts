import { Component, OnInit } from '@angular/core';
import { Globleservices } from 'src/services/globleservices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookslist',
  templateUrl: './bookslist.component.html',
  styleUrls: ['./bookslist.component.css']
})
export class BookslistComponent implements OnInit {
  defaultContent
  bookdata={
    modulename:"books",
    tabletitle:"Book List",
    // createbtnurl:"create",
    // createbtntitle:"Add New Books",
    buttons:[
      {title:"Issue 1 day",icon:"fas fa-edit", class:"btn btn-primary",type:"issue1day"},
      {title:"Issue 7 days",icon:"fas fa-edit", class:"btn btn-primary",type:"issue7days"},
      {title:"Read",icon:"fas fa-edit", class:"btn btn-primary",type:"manage"},
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
    this.service.getAll("books",(res)=>{
      console.log(res)
      this.bookdata['data']=res;
    });
  }

  ngOnInit() {
  }
  actionTable(data)
  {
    if(data.type=="issue1day" || data.type=="issue7days")
    {
      var data1 = {}
      data1['data'] = data.data
      data1['uuid']=localStorage.getItem("userid")
      var id;
      if(data.type=="issue1day"?(id=1):(id=7))
      this.service.postdata("issuerequest1/"+id,data1,(a)=>{
        if(a.status =="success")
        {alert("issue request has been generated")}
        else if(a.msg)
        {
          alert(a.msg)
        }
        else
        {alert("server error please try again later")}
      })
    }
  }

}
