import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Globleservices } from 'src/services/globleservices';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {
  userForm: FormGroup;
  userdata
  constructor(private service:Globleservices,private fbuilder: FormBuilder) { 
    this.buildForm()
    this.service.getById("memberdetail",localStorage.getItem("userid"),(res)=>{
      this.userdata  =res
    });

    
  }
  buildForm(){
    this.userForm = this.fbuilder.group(
      {
        'name': ['', [Validators.required, Validators.minLength(4)]],
      }
    );
  }

  ngOnInit() {
  }
  edit()
  {}

}
