export type Gallery = {
  id: number;
  name: string;
  url: string;
};

export type Tab = {
  title: string;
  value: string;
  iconComponent: JSX.Element;
};

export type MenuTab = {
  title: string;
  value: string;
};

export type State = {
  errors?: {
    id?: number[];
    orden?: string[];
    categoryTitle?: string[];
    image?: string[];
    title?: string[];
    description?: string[];
    price?: string[];
  };
  message?: string | null;
};

export type MenuItem = {
  id: string;
  orden?: number | null;
  category?: string;
  image: string | null;
  title: string;
  description?: string | null;
  price: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Category = {
  id: string;
  orden?: number | null;
  title: string;
}