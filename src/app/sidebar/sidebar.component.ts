import { Component } from '@angular/core';
import { MenuItem  } from '../models/menu-item';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
currentIcon: string[] = [];
isSubMenuOpen: boolean[] = [];
  menuItems: MenuItem[] | undefined;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.http.get<MenuItem[]>('./assets/data/menu.json')
      .subscribe(menuItems => {
        this.menuItems = menuItems;
        // Do something with the menu items here if necessary
      });
  }
  toggleSubMenu(index: number): void {
    this.isSubMenuOpen[index] = !this.isSubMenuOpen[index];
    this.currentIcon[index] = this.isSubMenuOpen[index] ? './assets/icons/up-icon.svg' : './assets/icons/down-icon.svg';
  }
}


