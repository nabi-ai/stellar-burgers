import { forwardRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '@ui';
import { selectConstructorBun, selectConstructorItems } from '@slices';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  // Получаем данные из хранилища
  const bun = useSelector(selectConstructorBun);
  const constructorIngredients = useSelector(selectConstructorItems);

  const ingredientsCounters = useMemo(() => {
    const counters: { [key: string]: number } = {};

    // Считаем начинки и соусы
    constructorIngredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });

    // Считаем булку (всегда 2 штуки)
    if (bun) counters[bun._id] = 2;

    return counters;
  }, [bun, constructorIngredients]); // Зависимости от данных из хранилища

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
