import { Component ,OnInit} from '@angular/core';
import { Globleservices } from '../../services/globleservices'
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createbooks',
  templateUrl: './createbooks.component.html',
  styleUrls: ['./createbooks.component.css']
})
export class CreatebooksComponent implements OnInit {

  bookForm: FormGroup;
  constructor(private service: Globleservices, private route: Router, private fbuilder: FormBuilder){
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm() {
    this.bookForm = this.fbuilder.group(
      {
        'title': ['', [Validators.required, Validators.minLength(4)]],
        'author': ['', [Validators.required, Validators.maxLength(12)]],
        'isbn': ['', [Validators.required, Validators.maxLength(12)]],
        'reading': ['', [Validators.required]],
        'issue': ['', [Validators.required]]
      }
    );
  }
  add()
  {
    var data1 = {}
    data1['title'] = this.bookForm.controls.title.value;
    data1['author'] = this.bookForm.controls.author.value;
    data1['isbn'] = this.bookForm.controls.isbn.value;
    data1['reading'] = this.bookForm.controls.reading.value;
    data1['issue'] = this.bookForm.controls.issue.value;
    for(var key in data1)
    {
      if(!data1[key])
      {
        alert("Enter details for "+ key)
        return
      }
    }
    if(data1['reading']==0 && data1['issue']==0)
      {
        alert("books for reading and issue cannot be zero")
        return
      }
    if(data1['reading']<0)
    {
      alert('reading books cannot be less than zero')
      return
    }
    if(data1['issue']<0)
    {
      alert('issue books cannot be less than zero')
      return
    }
    this.service.getById('checkisbn',data1['isbn'],(a)=>{
      console.log(a)
      if(a.status=="Present")
      {
        alert("Books with same ISBN number are already in library")
        return
      }
      else if(a.status=="NotPresent")
      {
        console.log(111)
        this.service.postdata("addbook",data1,(a)=>{
          console.log(a)
        })
      }
      else
      {
        alert("Server error, Try again later")
        return 
      }
    })

    // this.service.login(data1,2,(a)=>{
    //   console.log(a)
    // })
  }
  

}
