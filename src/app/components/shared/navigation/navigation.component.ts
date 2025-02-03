import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

type MenuItem = {
  name: string;
  icon: string;
  route: string;
};

const MENU_ITEMS: MenuItem[] = [
  {
    name: 'Productos',
    icon: 'construction',
    route: '/productos',
  },
  {
    name: 'Categorías',
    icon: 'category',
    route: '/categorias',
  },
  {
    name: 'Marcas',
    icon: 'sell',
    route: '/marcas',
  },
];

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
  ],
})
export class NavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);

  get menuItems(): MenuItem[] {
    return [...MENU_ITEMS];
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
