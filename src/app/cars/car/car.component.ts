import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {

  constructor(public apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm()
  }


  resetForm(form?: NgForm){
    if (form!=null)
      form.resetForm();
    this.apiService.car = {
      id: null,
      name: '',
      productionDate: '',
    }
  }

  onSubmit(form: NgForm){
    this.addRecord(form)
  }

  addRecord(form: NgForm){
    console.log(form.value);
    this.apiService.postData(form.value).subscribe(response => {
      this.toastr.success("Inserted successfully", form.value.name);
      this.resetForm(form);
      this.apiService.getData();
    }, err => {
      this.toastr.error("Error while adding record", form.value.name);
      console.log(err);
    })
  }

  editRecord(form: NgForm){
    this.apiService.putData(form.value).subscribe(response =>{
      this.toastr.info("Edited successfully", form.value.name);
      this.resetForm(form);
      this.apiService.getData();
    }, err => {
      this.toastr.error("Error while editnig record", form.value.name);
      console.log(err);
    })
  }
}
