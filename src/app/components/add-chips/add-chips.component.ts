import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Chips } from '../../chips.model';

import { ActivatedRoute, ParamMap } from "@angular/router";
import { ChipsService } from 'src/app/chips.service';
import { mimeType } from "./mime-type.validator";

@Component({
  selector: 'app-add-chips',
  templateUrl: './add-chips.component.html',
  styleUrls: ['./add-chips.component.css']
})
export class AddChipsComponent implements OnInit {

  enteredName = "";
  enteredEmail = "";
  form: FormGroup;
  chip: Chips;
  isLoading = false;
  imagePreview: string;

  constructor(
    public chipsService: ChipsService,
    public route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)]
      }),
      email: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    })
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;

    this.chipsService.addChips(
      this.form.value.name,
      this.form.value.email,
      this.form.value.image
    );

    this.form.reset();
  }

}
