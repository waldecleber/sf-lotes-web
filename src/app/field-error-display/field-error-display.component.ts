import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-field-error-display',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.css'],
  standalone: true

})
export class FieldErrorDisplayComponent {

  @Input() errorMsg?: string;
  @Input() displayError?: boolean;

}