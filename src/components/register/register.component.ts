import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterDTO } from 'src/DTOs/register-dto';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent extends BaseComponent implements OnInit {
  public registerFormGroup: FormGroup;

  constructor(toastService: ToastrService, private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    super(toastService);
  }

  ngOnInit() {
    this.registerFormGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }
    );
  }
  
  public register(): void {
    if (!this.registerFormGroup.valid) {
      this.markFormGroupTouched(this.registerFormGroup);
      return;
    }

    let registerDTO: RegisterDTO = new RegisterDTO(this.registerFormGroup.value);

    this.authenticationService.register(registerDTO).
      subscribe(() =>
        this.showSuccess('User registered successfully'),
        httpErrorResponse => this.showError(httpErrorResponse));
  }
}
