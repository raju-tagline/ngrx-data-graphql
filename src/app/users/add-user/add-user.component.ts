import { CounterService } from './../../counter-service/counter.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  public addUserForm!: FormGroup;

  constructor(private counterService: CounterService) {}

  ngOnInit(): void {
    this.createForm();
  }

  /**
   * createForm
   */
  public createForm() {
    this.addUserForm = new FormGroup({
      email: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      full_name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    });
  }

  /**
   * onSubmit
   */
  public onSubmit() {
    if (this.addUserForm.invalid) {
      return;
    }
    const data: any = {
      ...this.addUserForm.value,
      userId:
        this.addUserForm.value.email.toLowerCase() +
        this.addUserForm.value.full_name.toLowerCase(),
    };
    this.counterService.add(data);
    this.addUserForm.reset();
  }
}
