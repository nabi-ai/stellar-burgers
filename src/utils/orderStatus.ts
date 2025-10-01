import { TOrder, TIngredient } from './types';

export const getOrderStatus = (status: string): string => {
  switch (status) {
    case 'done':
      return 'Выполнен';
    case 'pending':
      return 'Готовится';
    case 'created':
      return 'Создан';
    case 'cancelled':
      return 'Отменён';
    default:
      return 'Неизвестно';
  }
};

export const getOrderStatusColor = (status: string): string => {
  switch (status) {
    case 'done':
      return '#00CCCC';
    case 'pending':
      return '#F2C94C';
    case 'created':
      return '#F2C94C';
    case 'cancelled':
      return '#E52B50';
    default:
      return '#8585AD';
  }
};

export const calculateOrderPrice = (
  order: TOrder,
  ingredients: TIngredient[]
): number => {
  if (!order.ingredients || !ingredients.length) return 0;

  return order.ingredients.reduce((total, ingredientId) => {
    const ingredient = ingredients.find((ing) => ing._id === ingredientId);
    return total + (ingredient?.price || 0);
  }, 0);
};

export const getOrderIngredients = (
  order: TOrder,
  ingredients: TIngredient[]
): (TIngredient & { count: number })[] => {
  if (!order.ingredients || !ingredients.length) return [];

  const ingredientCounts: { [key: string]: number } = {};

  order.ingredients.forEach((ingredientId) => {
    ingredientCounts[ingredientId] = (ingredientCounts[ingredientId] || 0) + 1;
  });

  return Object.entries(ingredientCounts)
    .map(([id, count]) => {
      const ingredient = ingredients.find((ing) => ing._id === id);
      if (!ingredient) return null;
      return {
        ...ingredient,
        count
      };
    })
    .filter((item): item is TIngredient & { count: number } => item !== null);
};
