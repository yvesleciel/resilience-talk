import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthenticationService} from "../authentication.service";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent {

  authService = inject(AuthenticationService);
   fb = inject(FormBuilder);

  signInForm = this.fb.group({
    name: ['', Validators.minLength(3)],
    login: ['', Validators.email],
    password: ['', Validators.minLength(8)],
    confirmPassword: ['', Validators.minLength(8)]
  })

  onSignUp(){
    const login = this.signInForm.get('login')?.value ?? ''
    const name = this.signInForm.get('name')?.value ?? ''
    const password = this.signInForm.get('password')?.value ?? ''
    const confirmPassword = this.signInForm.get('confirmPassword')?.value

   if(password === confirmPassword) this.authService.signUpWithUsernameAndPass(name, login, password)
    else{
      this.authService.errorMessage = 'password and confirmPassword not match';
   }
  }

  onSignInWithGoogle(){
    this.authService.signInWithGoogle()
  }
}
