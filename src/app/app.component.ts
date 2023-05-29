import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Casino';
  sideBarOpen = false;
  isTabletView = false;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkViewportSize();
  }
  ngOnInit() {
    this.checkViewportSize();
  }
  checkViewportSize() {
    const screenWidth = window.innerWidth;
    this.isTabletView = screenWidth >= 740 && screenWidth <= 1023 || screenWidth <= 739;

    if (this.isTabletView && this.sideBarOpen) {
      this.sideBarOpen = false;
    }
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
