import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthenticationService} from "../authentication.service";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit{

  authService = inject(AuthenticationService);
  fb = inject(FormBuilder);
  router = inject(Router)
  singUpForm = this.fb.group({
    login: ['', [Validators.email]],
    password: ['', [Validators.minLength(8)]]
  })

   ngOnInit() {

  }

  onSingIn(){
    let login = this.singUpForm.get('login')?.value ?? ''
    let password = this.singUpForm.get('password')?.value ?? ''
    console.log(login, password)
    this.authService.signInWithUsernameAndPass(login, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        this.router.navigate([''])
      })
      .catch((error) => {
        const errorCode = error.code;
        this.authService.errorMessage = 'Invalid ID';
      });
  }

  onSignInWithGoogle(){
    this.authService.signInWithGoogle()
  }
}
