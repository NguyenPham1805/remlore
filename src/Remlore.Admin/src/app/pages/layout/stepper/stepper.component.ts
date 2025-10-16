import { NgClass } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { MatRipple } from "@angular/material/core";
import { NbButtonModule, NbCardModule, NbStepperModule } from "@nebular/theme";

@Component({
  selector: "rl-stepper",
  templateUrl: "stepper.component.html",
  styleUrls: ["stepper.component.scss"],
  imports: [
    NbCardModule,
    NbStepperModule,
    NbButtonModule,
    ReactiveFormsModule,
    NgClass,
    MatRipple,
  ],
})
export class StepperComponent implements OnInit {
  firstForm!: UntypedFormGroup;
  secondForm!: UntypedFormGroup;
  thirdForm!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit() {
    this.firstForm = this.fb.group({
      firstCtrl: ["", Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ["", Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ["", Validators.required],
    });
  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }
}
