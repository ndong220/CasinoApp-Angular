import { DataService } from './data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  expanded: boolean = false;
  datacount: number = 0;
  showLessHeight: string = '50px';
  items: any[] | undefined;
  constructor(private dataService: DataService) {}
  ngOnInit() {
    this.items = this.dataService.getData().map(item => {
      return {
        ...item,
        expanded: false
      };
    });
  }
  toggleExpanded(index: number) {
    if (this.items && this.items[index]) {   // Add null/undefined checks
      this.items[index].expanded = !this.items[index].expanded;
    }
  }

}
