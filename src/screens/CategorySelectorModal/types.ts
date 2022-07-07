export interface CategorySelectorModalProps {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}
interface Category {
  name: string;
  key: string;
}
