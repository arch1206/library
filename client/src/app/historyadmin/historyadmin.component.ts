import { Component, OnInit } from '@angular/core';
import { Globleservices } from 'src/services/globleservices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historyadmin',
  templateUrl: './historyadmin.component.html',
  styleUrls: ['./historyadmin.component.css']
})
export class HistoryadminComponent implements OnInit {
  defaultContent
  historydata={
    modulename:"history",
    tabletitle:"Book List",
    // createbtnurl:"create",
    // createbtntitle:"Add New Books",
    buttons:[
      // {title:"Delete",icon:"fas fa-edit", class:"btn btn-primary",type:"delete"},
      // {title:"Delete",icon:"fas fa-trash", class:"btn btn-danger",type:"delete", permission:"faculty.center.delete"}
    ],
    columns:[
      {name:"title",lable:"Title"},
      {name:"issuedate",lable:"Issue Date"},
      {name:"member",lable:"Issued by"},
      {name:"returndate",lable:"Returned At"},
      // {name:"status",lable:"Status"},
      {name:'action',lable:"Actions"}
    ]
  };
  constructor(private service:Globleservices, private router:Router) { 
    this.service.getAll("history",(res)=>{
      this.historydata['data']=res;
    });
  }

  ngOnInit() {
  }
  actionTable(data)
  {
    console.log(data)
    this.service.getById("deletehistory",data.data[4],(a)=>{
     if(a.status=="success")
      location.reload()
      else
      {
        alert("server error, please try again later")
      }
    })
  }

}
