import { Component, OnInit } from '@angular/core';
import { Globleservices } from 'src/services/globleservices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acceptbookadmin',
  templateUrl: './acceptbookadmin.component.html',
  styleUrls: ['./acceptbookadmin.component.css']
})
export class AcceptbookadminComponent implements OnInit {
  defaultContent
  issuerequestdata={
    modulename:"issuerequstdata",
    tabletitle:"Issue Requests List",
    // createbtnurl:"create",
    // createbtntitle:"Add New Books",
    buttons:[
      {title:"Accept",icon:"fas fa-edit", class:"btn btn-primary",type:"accept"},
      {title:"Reject",icon:"fas fa-edit", class:"btn btn-primary",type:"reject"},
      // {title:"Delete",icon:"fas fa-trash", class:"btn btn-danger",type:"delete", permission:"faculty.center.delete"}
    ],
    columns:[
      {name:"title",lable:"Title"},
      {name:"by",lable:"Requested by"},
      {name:"date",lable:"Requested date"},
      {name:"period",lable:"Requested period"},
      // {name:"created_at",lable:"Created At"},
      // {name:"status",lable:"Status"},
      {name:'action',lable:"Actions"}]
  };
  constructor(private service:Globleservices, private router:Router) { 
    this.service.getAll("book",(res)=>{
      this.issuerequestdata['data']=res;
    });
  }

  ngOnInit() {
  }
  actionTable(data)
  {
    console.log(data)
    if(data.type=="reject"){
      this.service.getById("rejectrequest",data.data[4],(a)=>{
        if(a.status=="success")
          alert("request rejected")
        else
          alert("Server error , Please try again later")
      })
    }
    else if(data.type=="accept"){
      this.service.postdata("acceptrequest",data.data,(a)=>{
        console.log(a)
        if(a.status=="success")
          alert("request accepted")
        else
          alert("Server error , Please try again later")
      })
    }
  }


}
