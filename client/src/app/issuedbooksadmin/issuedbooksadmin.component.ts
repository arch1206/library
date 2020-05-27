import { Component, OnInit } from '@angular/core';
import { Globleservices } from 'src/services/globleservices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issuedbooksadmin',
  templateUrl: './issuedbooksadmin.component.html',
  styleUrls: ['./issuedbooksadmin.component.css']
})
export class IssuedbooksadminComponent implements OnInit {

  defaultContent
  issuedbookdata={
    modulename:"issuedbooks",
    tabletitle:"Book List",
    // createbtnurl:"create",
    // createbtntitle:"Add New Books",
    buttons:[
      // {title:"Manage",icon:"fas fa-edit", class:"btn btn-primary",type:"manage"},
      // {title:"Delete",icon:"fas fa-trash", class:"btn btn-danger",type:"delete", permission:"faculty.center.delete"}
    ],
    columns:[
      {name:"title",lable:"Title"},
      {name:"requestdatetime",lable:"Request"},
      {name:"name",lable:"Member name"},
      {name:"requested period",lable:"Ations"},
      // {name:"created_at",lable:"Created At"},
      // {name:"status",lable:"Status"},
      // {name:'action',lable:"Actions"}
    ]
  };
  constructor(private service:Globleservices, private router:Router) { 
    this.service.getAll("issuedbooks",(res)=>{
      this.issuedbookdata['data']=res;
      console.log(res)
    });
  }

  ngOnInit() {
  }
  actionTable(data)
  {
    // console.log(data)
    // this.router.navigate(['/libadmin/book/edit/'+data.data[3]]);
  }

}
