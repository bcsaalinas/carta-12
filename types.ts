export enum CourseType {
  STARTER = 'STARTER',
  MAIN = 'MAIN',
  DESSERT = 'DESSERT',
  COCKTAIL = 'COCKTAIL'
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  type: CourseType;
  pairing?: string;
  image?: string; // image used for hover preview
}

export interface Chef {
  name: string;
  bio: string;
  origin: string;
  image: string;
}

export interface MonthlyConcept {
  id: string;
  month: string;
  year: number;
  title: string;
  themeColor: string;
  description: string;
  story: string;
  chef: Chef;
  menu: Dish[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
