import { Component, ElementRef, Renderer2, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-desc',
  templateUrl: './desc.component.html',
  styleUrls: ['./desc.component.scss']
})
export class DescComponent implements AfterViewInit {
  isMobile: boolean = false;
  menuItems = [
    { id: 'how-to', label: 'How to choose a casino' },
    { id: 'criteria', label: 'Criteria used in our ratings' },
    { id: 'how-we', label: 'How we sort casinos' },
    { id: 'casinos', label: 'Casinos for specific countries' },
    { id: 'advanced', label: 'Advanced casino filters' }
  ];
  items = [
    { name: 'Complete a side-project', points: '+1', spent: '1.248.4000000000000000000' },
    { name: 'Report a useful feedback (upon your verification)', points: '+2', spent: '952.541' },
    { name: 'Report an illegal download source (upon your mind)', points: '+3', spent: '11.396.302' },
    { name: 'Share your experience', points: '+1', spent: '89.393' },
    { name: 'Deploy a design system', points: '+1', spent: '16.719' }
  ];

  activeMenuItem: string = this.menuItems[0].id;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const questions = this.elementRef.nativeElement.querySelectorAll(".question");
    questions.forEach((question :any) => {
      const answer = question.querySelector(".question__answer");
      const icon = question.querySelector(".fa-solid");

      this.renderer.listen(icon, "click", () => {
        const isActive = question.classList.toggle("active");
        this.renderer.setStyle(answer, "display", (isActive ? "block" : "none"));
        this.renderer.removeClass(icon, (isActive ? "fa-circle-plus" : "fa-circle-minus"));
        this.renderer.addClass(icon, (isActive ? "fa-circle-minus" : "fa-circle-plus"));
      });
    });
  }


  scrollToTarget(targetId: string) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth',block: 'center' });
    }
  }

  ngOnInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeMenuItem = entry.target.id;
          }
        });
      },
      { threshold: 0.5 }
    );

    this.menuItems.forEach((menuItem) => {
      const targetElement = document.getElementById(menuItem.id);
      if (targetElement) {
        observer.observe(targetElement);
      }
    });

    Object.keys(this.closedSections).forEach((section) => {
      if (this.closedSections[section]) {
        this.toggleDescription(section);
      }
    });
  }
  closedSections: { [key: string]: boolean } = {
    descriptionOne: true,
    descriptionTwo: true,
    descriptionThree:true,
    descriptionFour : true ,
    descriptionFive : true,
    descriptionSix : true,
    descriptionSeven: true,
  };

  isClosed(section: string): boolean {
    return this.closedSections[section];
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(_event: any) {
    this.isMobile = window.innerWidth <= 739;
  }
  toggleDescription(section: string) {
    if (this.isMobile) {
      this.closedSections[section] = !this.closedSections[section];
    }
  }
}
