import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray,Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dealer } from '../models/menu-item';
import { tap, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit{
  dealers: any[] = [];
  pagedDealers: any[] = [];
  currentPage: number = 1;
  pageSize: number = 4;
  totalDealers: number = 0;
  showAllDealers: boolean = false;
  reviewForm!: FormGroup; // Reactive Form
  @ViewChild('reviewModal') reviewModal: any;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
    ) {}

  ngOnInit() {
    this.getDealers();
    this.reviewForm = this.formBuilder.group({
      id: [''],
      stt: ['',Validators.required],
      logo: ['',Validators.required],
      name: ['',Validators.minLength(4)],
      color: ['',Validators.required],
      Evaluate: ['',Validators.required],
      exclusive: ['',Validators.required],
      whyPlay: this.formBuilder.array([],Validators.required),
      bonus: this.formBuilder.group({
        maxDeposit: ['',Validators.required],
        match: ['',Validators.required],
        minDeposit: ['',Validators.required],
        wagerReq: ['',Validators.required],
        excludeBonus: ['',Validators.required],
        noDeposit: ['',Validators.required]
      })
    });
  }

  openReviewForm(dealerId: number) {
    const dealer = this.dealers.find(d => d.id === dealerId);
    if (dealer) {
      const whyPlayArray = dealer.whyPlay.map((reason: any) => this.formBuilder.control(reason));
      this.reviewForm.setControl('whyPlay', this.formBuilder.array(whyPlayArray));
      this.reviewForm.patchValue({
        id: dealer.id,
        logo: dealer.logo,
        stt: dealer.stt,
        name: dealer.name.toUpperCase(),
        color: dealer.color,
        Evaluate: dealer.Evaluate,
        exclusive: dealer.exclusive,
        bonus: {
          maxDeposit: dealer.bonus.maxDeposit,
          match: dealer.bonus.match,
          minDeposit: dealer.bonus.minDeposit,
          wagerReq: dealer.bonus.wagerReq,
          excludeBonus: dealer.bonus.excludeBonus,
          noDeposit: dealer.bonus.noDeposit
        }
      });
      this.modalService.open(this.reviewModal, { ariaLabelledBy: 'modal-basic-title' });
    }
  }

  getWhyPlayControls() {
    return (this.reviewForm.get('whyPlay') as FormArray).controls;
  }

  onSubmitReview() {
    if (this.reviewForm.invalid) {
      return;
    }
    const formData = this.reviewForm.value;

    const dealerId = formData.id;
    const url = `http://localhost:3000/dealers/${dealerId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(url, formData, { headers }).pipe(
      tap((response: any) => {
        console.log('Đã cập nhật dữ liệu thành công:', response);

        const updatedDealerIndex = this.dealers.findIndex((dealer) => dealer.id === dealerId);
        if (updatedDealerIndex !== -1) {
          this.dealers[updatedDealerIndex] = formData;
        }
        this.reviewForm.patchValue(formData);

        // Cập nhập lại dữ liệu hiển thị trên giao diện
        const updatedPagedDealerIndex = this.pagedDealers.findIndex((dealer) => dealer.id === dealerId);
        if (updatedPagedDealerIndex !== -1) {
          this.pagedDealers[updatedPagedDealerIndex] = formData;
        }
        this.modalService.dismissAll();

        this.snackBar.open('Submit successful', 'Close', {
          duration: 500000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      }),
      catchError((error) => {
        console.error('Đã xảy ra lỗi khi cập nhật dữ liệu:', error);
        this.snackBar.open('Submit failed', 'Close', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        return [];
      })
    ).subscribe();
  }



  //
  openEditForm(dealer: Dealer) {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '400px',
      data: { ...dealer } // Data transmission dealer to component children
    });

    dialogRef.afterClosed().subscribe((result: Dealer) => {
      if (result) {
        this.updateDealer(result); // Update updated data from child component
      }
    });
  }

  updateDealer(updatedDealer: Dealer): void {
    const updatedDealerIndex = this.dealers.findIndex((dealer) => dealer.id === updatedDealer.id);
    if (updatedDealerIndex !== -1) {
      this.dealers[updatedDealerIndex] = updatedDealer;
    }

    const updatedPagedDealerIndex = this.pagedDealers.findIndex((dealer) => dealer.id === updatedDealer.id);
    if (updatedPagedDealerIndex !== -1) {
      this.pagedDealers[updatedPagedDealerIndex] = updatedDealer;
    }
  }
  showMoreDealers() {
    this.showAllDealers = !this.showAllDealers;
    if (this.showAllDealers) {
      this.pageSize = this.totalDealers;
      this.currentPage = 1;
    } else {
      this.pageSize = 4;
      if (this.currentPage > this.getTotalPages()) {
        this.currentPage = this.getTotalPages();
      }
    }
    this.updatePagedDealers();
  }

  getDealers() {
    this.http.get<any[]>('http://localhost:3000/dealers').subscribe({
      next: (dealers: any[]) => {
        this.dealers = dealers;
        this.totalDealers = this.dealers.length;
        this.updatePagedDealers();
      },
      error: (err: any) => {
        console.error(err);
      },
      complete: () => {
        console.log('Request completed successfully!');
      }
    });
  }

  updatePagedDealers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedDealers = this.dealers.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.updatePagedDealers();
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.totalDealers / this.pageSize);
  }

  getPageNumbers(): number[] {
    return Array(this.getTotalPages()).fill(0).map((_, index) => index + 1);
  }

  previousPage() {
    this.onPageChange(this.currentPage - 1);
  }

  nextPage() {
    this.onPageChange(this.currentPage + 1);
  }

  getFirstResultIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  getLastResultIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalDealers);
  }

}
