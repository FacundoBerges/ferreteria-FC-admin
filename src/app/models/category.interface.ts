export interface Category {
  id?: number;
  name: string;
  imgUrl: string;
}

export interface CategoryTable {
  id: number;
  name: string;
}

export const categoryKeys: string[] = ['id', 'name', 'imgUrl'];
export const categoryTableKeys: string[] = ['id', 'name'];
