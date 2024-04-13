import {Component, NgModule, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import {NgClass, NgIf} from "@angular/common";
import {MessageComponent} from "./message/message.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, NgIf, MessageComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit{
  myForm: FormGroup;
  showErrorMessage: boolean = false;
  showSuccessMessage: boolean = false;
  submitted: boolean = false;
  showReset: boolean = false;
  nameChanged: boolean = false;
  surnameChanged: boolean = false;
  emailChanged: boolean = false;
  workingExperienceChanged: boolean = false;


  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      workingExperience: ['', [Validators.required, this.workingExperienceValidator()]]
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, this.emailValidator()]],
      workingExperience: ['', [Validators.required, this.workingExperienceValidator()]]
    });

    this.myForm.get('name')?.valueChanges.subscribe(() => {
      this.nameChanged = true;
      console.log("vksjeb")
    });

    this.myForm.get('surname')?.valueChanges.subscribe(() => {
      this.surnameChanged = true;
      console.log("vksjeb")
    });

    this.myForm.get('email')?.valueChanges.subscribe(() => {
      this.emailChanged = true;
      console.log("vksjeb")
    });

    this.myForm.get('workingExperience')?.valueChanges.subscribe(() => {
      this.workingExperienceChanged = true;
      console.log("vksjeb")
    });
  }

  emailValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email = control.value;
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValid = emailPattern.test(email);
      return isValid ? null : { invalidEmail: true };
    };
  }

  workingExperienceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const isValid = /^(\d+([,.]\d{1,})?|\.\d{1,})$/.test(value) && /^\d+(\.|,)?\d{0,1}$/.test(value);;
      return isValid ? null : { invalidExperience: true };
    };
  }

  focusNext(input: HTMLInputElement) {
    const form = input.form;
    if (form) {
      const index = Array.from(form).indexOf(input);
      if (index < form.length - 1) {
        const nextInput = form[index + 1] as HTMLInputElement;
        nextInput.focus();
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    this.nameChanged = false;
    this.surnameChanged = false;
    this.emailChanged = false;
    this.workingExperienceChanged = false;
    if (this.myForm.valid) {
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
    } else {
      this.showErrorMessage = true;
      setTimeout(() => {
        this.showErrorMessage = false;
      }, 3000);
    }
  }

  onReset() {
    this.myForm.reset();
    this.showReset = true
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    this.submitted = false;
    this.nameChanged = false;
    this.surnameChanged = false;
    this.emailChanged = false;
    this.workingExperienceChanged = false;
    setTimeout(() => {
      this.showReset = false;
    }, 3000);
  }
}
