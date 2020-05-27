import { Component, OnInit } from '@angular/core';
import { Globleservices } from 'src/services/globleservices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userhistory',
  templateUrl: './userhistory.component.html',
  styleUrls: ['./userhistory.component.css']
})
export class UserhistoryComponent implements OnInit {

  defaultContent
  userhistorydata={
    modulename:"userhistory",
    tabletitle:"Book List",
    // createbtnurl:"create",
    // createbtntitle:"Add New Books",
    buttons:[
      {title:"Delete",icon:"fas fa-edit", class:"btn btn-primary",type:"delete"},
      // {title:"Delete",icon:"fas fa-trash", class:"btn btn-danger",type:"delete", permission:"faculty.center.delete"}
    ],
    columns:[
      {name:"title",lable:"Title"},
      {name:"issuedate",lable:"Issue Date"},
      {name:"returndate",lable:"Returned At"},
      // {name:"status",lable:"Status"},
      {name:'action',lable:"Actions"}
    ]
  };
  constructor(private service:Globleservices, private router:Router) { 
    this.service.getById("userhistory",localStorage.getItem('userid'),(res)=>{
      this.userhistorydata['data']=res;
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
