
import { Component ,OnInit} from '@angular/core';
import { Globleservices } from '../../services/globleservices'
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-memberlogin',
  templateUrl: './memberlogin.component.html',
  styleUrls: ['./memberlogin.component.css']
})
export class MemberloginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private service: Globleservices, private route: Router, private fbuilder: FormBuilder){
    this.buildForm();
  }

  ngOnInit() {
  }
  buildForm() {
    this.loginForm = this.fbuilder.group(
      {
        'username': ['', [Validators.required, Validators.minLength(4)]],
        'password': ['', [Validators.required, Validators.maxLength(12)]]
      }
    );
  }
  login()
  {
    var data1 = {}
    data1['username'] = this.loginForm.controls.username.value;
    data1['password'] = this.loginForm.controls.password.value;
    this.loginForm.reset()
    this.service.login(data1,1,(a)=>{
      console.log(a)
    })
  }
  get f() { return this.loginForm.controls; }


}





