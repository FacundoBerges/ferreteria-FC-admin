import { Component, inject } from '@angular/core';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { MENU_ITEMS, MenuItem } from '../../../interfaces/menu-items.interface';

@Component({
  selector: 'admin-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
    RouterLink,
    TitleCasePipe,
  ],
})
export class NavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);
  public title: string = `Panel de administración - ${MENU_ITEMS[0].name}`;

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  get menuItems(): MenuItem[] {
    return [...MENU_ITEMS];
  }

  public setActiveMenuItem(menuItem: string) {
    this.title = `Panel de administración - ${menuItem}`;
  }
}
