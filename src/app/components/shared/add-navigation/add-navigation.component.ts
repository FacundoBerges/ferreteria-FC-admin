import { Component } from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MENU_ITEMS, MenuItem } from '../../../interfaces/menu-items.interface';

@Component({
  selector: 'admin-add-navigation',
  templateUrl: './add-navigation.component.html',
  styleUrl: './add-navigation.component.scss',
  imports: [LowerCasePipe, MatButtonModule, MatIconModule, RouterLink],
})
export class AddNavigationComponent {
  get menuItems(): MenuItem[] {
    return [...MENU_ITEMS];
  }
}
