import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})

export abstract class BaseComponent implements OnInit {

  constructor(private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  private getFirstErrorMessage(httpErrorResponse: HttpErrorResponse): string {
    let errorObject = httpErrorResponse.error;

    //// let errorsArray = httpErrorResponse['error']['errors']; //TODO: add validation for errors
    let errorKeys = Object.keys(errorObject);
    let firstErrorKey = errorKeys[0];
    let firstErrorMessage = errorObject[firstErrorKey][0];
    return firstErrorMessage;
    // if (!httpErrorResponse.error[0]) {
    //   return httpErrorResponse.error[0][0];
    // }
    //return firstErrorMessage;
  }

  protected showSuccess(message: string): void {
    this.toastr.success(message);
  }

  protected showError(httpErrorResponse: HttpErrorResponse): void {
    this.toastr.error(this.getFirstErrorMessage(httpErrorResponse), httpErrorResponse.statusText);
  }
}
