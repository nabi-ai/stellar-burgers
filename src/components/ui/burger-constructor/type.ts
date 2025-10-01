import { TOrder, TIngredient, TConstructorIngredient } from '@utils-types';

export type TConstructorItems = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

export type BurgerConstructorUIProps = {
  constructorItems: TConstructorItems;
  isOrderLoading: boolean;
  price: number;
  showOrderPreparingStarted: boolean;
  createdOrderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
