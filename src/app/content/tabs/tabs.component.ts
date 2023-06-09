import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit{
  expanded: boolean = false;
  showLessHeight: string = '50px';
  items: any[] | undefined;

  constructor(private http: HttpClient) {}
  toggleExpanded(index: number) {
    if (this.items && this.items[index]) {
      this.items[index].expanded = !this.items[index].expanded;
    }
  }
  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/tabs').subscribe({
      next: (tabs) => {
        this.items = tabs;
        console.log('this.items :>> ', this.items);
      },
      error: (err) => {
        console.error(err);
        console.log('err :>> ', err);
      },
      complete: () => {
        console.log('Request completed successfully!');
      }
    });
  }

}
