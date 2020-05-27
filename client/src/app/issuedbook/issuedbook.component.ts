import { Component, OnInit } from '@angular/core';
import { Globleservices } from 'src/services/globleservices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issuebook',
  templateUrl: './issuedbook.component.html',
  styleUrls: ['./issuedbook.component.css']
})
export class IssuedbookComponent implements OnInit {

  defaultContent
  issuedbookdata={
    modulename:"issuedbookuser",
    tabletitle:"Book List",
    // createbtnurl:"create",
    // createbtntitle:"Add New Books",
    buttons:[
      {title:"Return",icon:"fas fa-edit", class:"btn btn-primary",type:"return"},
      // {title:"Delete",icon:"fas fa-trash", class:"btn btn-danger",type:"delete", permission:"faculty.center.delete"}
    ],
    columns:[
      {name:"title",lable:"Title"},
      {name:"issuedate",lable:"Issue Date"},
      // {name:"created_at",lable:"Created At"},
      // {name:"status",lable:"Status"},
      {name:'action',lable:"Actions"}
    ]
  };
  constructor(private service:Globleservices, private router:Router) { 
    this.service.getById("issuedbookuser",localStorage.getItem('userid'),(res)=>{
      this.issuedbookdata['data']=res;
    });
  }

  ngOnInit() {
  }
  actionTable(data)
  {
    console.log(data)
    this.service.getById("returnbook",data.data[4],(a)=>{
     if(a.status=="success")
      location.reload()
      else
      {
        alert("server error, please try again later")
      }
    })
  }

}
