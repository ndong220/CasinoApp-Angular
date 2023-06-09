import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dealer } from 'src/app/models/menu-item';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @ViewChild('editForm', { static: true }) editForm: NgForm | undefined;

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dealer,
    private https: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  saveData(): void {
    const url = `http://localhost:3000/dealers/${this.data.id}`;

    if (this.editForm!.invalid) {
      return;
    }
    this.https.put(url, this.data).subscribe(
      response => {
        console.log('Dữ liệu đã được lưu thành công:', response);
        this.dialogRef.close(this.data);
        this.snackBar.open('Submit successful', 'Close', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      },
      error => {
        console.error('Lỗi khi lưu dữ liệu:', error);
        this.snackBar.open('Submit failed', 'Close', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    );
  }
}
