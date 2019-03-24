import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})

export abstract class BaseComponent implements OnInit {

  constructor(protected toastService: ToastrService) {
  }

  ngOnInit() {
  }

  private getFirstErrorMessage(httpErrorResponse: HttpErrorResponse): string {
    let errorObject = httpErrorResponse.error;
    let errorKeys = Object.keys(errorObject);
    let firstErrorKey = errorKeys[0];
    let firstErrorMessage = errorObject[firstErrorKey][0];
    return firstErrorMessage;
  }

  protected showSuccess(message: string): void {
    this.toastService.success(message);
  }

  protected showError(httpErrorResponse: HttpErrorResponse): void {
    this.toastService.error(this.getFirstErrorMessage(httpErrorResponse), httpErrorResponse.statusText);
  }

 /**
   * Marks all controls in a form group as touched
   * @param formGroup - The form group to touch
   */
  protected markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
