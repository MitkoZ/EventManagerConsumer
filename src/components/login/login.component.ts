import { Component, OnInit } from '@angular/core';
import { LoginDTO } from '../../DTOs/login-dto';
import { AuthenticationService } from '../../services/authentication.service'
import { BaseComponent } from '../base/base.component';
import { ToastrService } from 'ngx-toastr';
import { TokenDTO } from 'src/DTOs/token-dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent extends BaseComponent implements OnInit {
  public loginFormGroup: FormGroup;

  constructor(toastr: ToastrService, private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    super(toastr);
  }

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    }
    );
  }

  public onLogin(): void {
    if (!this.loginFormGroup.valid) {
      return;
    }
    let loginDTO: LoginDTO = new LoginDTO(this.loginFormGroup.value);

    this.authenticationService.login(loginDTO).
      subscribe(httpResponse => {
        this.authenticationService.saveToken(httpResponse as any as TokenDTO);
        this.showSuccess('Logged in successfully!');
      },
        httpErrorResponse => this.showError(httpErrorResponse));
  }
}
