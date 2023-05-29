import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent {
  startIndex: number = 1;
  endIndex: number = 18;
  totalResults: number = 4926;
  activeButton: string = '';
  activePage: number = 1;
  public showMore1: boolean = true;
  public showMore2: boolean = true;
  public showMore3: boolean = true;
  public showMore4: boolean = true;

  goToPage(pageNumber: number) {
    this.startIndex = (pageNumber - 1) * 18 + 1;
    this.endIndex = Math.min(this.startIndex + 17, this.totalResults);
    this.activePage = pageNumber; // Cập nhật activePage với trang mới
  }

  nextPage() {
    // Kiểm tra xem endIndex có vượt quá tổng số kết quả không
    if (this.endIndex + 18 <= this.totalResults) {
      this.startIndex += 18;
      this.endIndex += 18;
      this.activeButton = 'button-next';
    }
  }

  previousPage() {
    // Kiểm tra xem startIndex có nhỏ hơn 1 không
    if (this.startIndex > 1) {
      this.startIndex -= 18;
      this.endIndex -= 18;
      this.activeButton = 'button-pre';
    }
  }
}
