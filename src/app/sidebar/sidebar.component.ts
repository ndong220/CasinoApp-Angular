import {Component, OnInit} from '@angular/core';
import { MenuItem } from '../models/menu-item';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit{
  currentIcon: string[] = [];
  isSubMenuOpen: boolean[] = [];
  menuItems: MenuItem[] | undefined;
  subMenuApi = 'http://localhost:3000/menuItems';


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<MenuItem[]>(this.subMenuApi)
      .subscribe((menuItems) => {
        this.menuItems = menuItems;
      });
  }

  toggleSubMenu(index: number): void {
    this.isSubMenuOpen[index] = !this.isSubMenuOpen[index];
    this.currentIcon[index] = this.isSubMenuOpen[index]
      ? './assets/icons/up-icon.svg'
      : './assets/icons/down-icon.svg';
  }
}
