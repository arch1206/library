import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Globleservices } from 'src/services/globleservices';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
id;
type;
menu = []
  constructor(private route: ActivatedRoute ,private service:Globleservices, private router:Router ) {

      this.type = localStorage.getItem('type')
      if(this.type==1)
      {
        this.menu = [{title:"Dashboard","link":'/dashboard'},
        {title:"Books","link":'/books'},
        {title:"Issued books","link":'/issued/'+localStorage.getItem('userid')},
        {title:"History","link":'/history/'+localStorage.getItem('userid')}
        ]
      }
      else{
        this.menu = [{title:"Dashboard","link":'/libadmin/dashboard'},
        {title:"Books","link":'/libadmin/book'},
        {title:"Issued books","link":'/libadmin/issuedbooks'},
        {title:"Issue Request","link":'/libadmin/issuerequest'},
        {title:"History","link":'/libadmin/history'},
        {title:"users","link":'/libadmin/users'}
        ]
      }

  }

  ngOnInit() {
  }
  w3_open() {
    document.getElementById("main").style.marginLeft = "25%";
    document.getElementById("mySidebar").style.width = "25%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
  }
  w3_close() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
  }
  logout(){
    // console.log("asd")
    this.service.logout()
    // this.router.navigate(['/'])
    window.location.replace(window.location.origin);
    // console.log()
  }
}
