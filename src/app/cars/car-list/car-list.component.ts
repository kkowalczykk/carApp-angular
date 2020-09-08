import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Car } from 'src/models/Car.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {

  constructor(public apiService: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.apiService.getData();
    
  }

  fillForm(car: Car){
    this.apiService.car = Object.assign({},car);
  }

  deleteRecord(id: number){
    this.apiService.deleteData(id).subscribe(response => {
      this.toastr.success("Deleted successfully");
      this.apiService.getData();
    }, error => {
      this.toastr.error("Error while deleting");
      console.log(error);
    })
  }
}
