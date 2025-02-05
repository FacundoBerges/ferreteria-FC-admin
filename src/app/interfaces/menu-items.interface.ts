export type MenuItem = {
  name: string;
  icon: string;
  route: string;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    name: 'productos',
    icon: 'construction',
    route: '/productos',
  },
  {
    name: 'categorías',
    icon: 'category',
    route: '/categorias',
  },
  {
    name: 'marcas',
    icon: 'sell',
    route: '/marcas',
  },
];
