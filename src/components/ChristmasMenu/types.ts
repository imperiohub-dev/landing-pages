export interface MenuItem {
  name: string;
  details?: string;
  priceSmall?: string;
  priceLarge?: string;
  price?: string;
}

export interface MenuSection {
  title: string;
  emoji: string;
  items: MenuItem[];
}

export interface Combo {
  name: string;
  items: string[];
  price: string;
}

export interface MenuData {
  menuSections: MenuSection[];
  combos: Combo[];
}
