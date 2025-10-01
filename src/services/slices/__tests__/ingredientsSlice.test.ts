import reducer, {
  fetchIngredients,
  IngredientsState
} from '../ingredientsSlice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Test Ingredient 1',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 200,
    image: 'image1.jpg',
    image_mobile: 'image1-mobile.jpg',
    image_large: 'image1-large.jpg'
  },
  {
    _id: '2',
    name: 'Test Ingredient 2',
    type: 'main',
    proteins: 15,
    fat: 10,
    carbohydrates: 5,
    calories: 150,
    price: 150,
    image: 'image2.jpg',
    image_mobile: 'image2-mobile.jpg',
    image_large: 'image2-large.jpg'
  }
];

const initialState: IngredientsState = {
  items: [],
  isLoading: false,
  error: null
};

// Мокаем API вызов
jest.mock('@api', () => ({
  getIngredientsApi: jest.fn()
}));

describe('ingredientsSlice async actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchIngredients', () => {
    test('should handle fetchIngredients.pending', () => {
      const action = { type: fetchIngredients.pending.type };
      const result = reducer(initialState, action);

      expect(result).toEqual({
        items: [],
        isLoading: true,
        error: null
      });
    });

    test('should handle fetchIngredients.fulfilled', () => {
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const result = reducer({ ...initialState, isLoading: true }, action);

      expect(result).toEqual({
        items: mockIngredients,
        isLoading: false,
        error: null
      });
    });

    test('should handle fetchIngredients.rejected with payload error', () => {
      const errorMessage = 'Network error';
      const action = {
        type: fetchIngredients.rejected.type,
        payload: errorMessage
      };
      const result = reducer({ ...initialState, isLoading: true }, action);

      expect(result).toEqual({
        items: [],
        isLoading: false,
        error: errorMessage
      });
    });

    test('should handle fetchIngredients.rejected without payload', () => {
      const action = {
        type: fetchIngredients.rejected.type,
        payload: undefined
      };
      const result = reducer({ ...initialState, isLoading: true }, action);

      expect(result).toEqual({
        items: [],
        isLoading: false,
        error: 'Failed to fetch ingredients'
      });
    });
  });

  test('should return initial state for unknown action', () => {
    const result = reducer(initialState, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(initialState);
  });
});

// Тесты для селекторов
describe('ingredientsSlice selectors', () => {
  const mockState = {
    ingredients: {
      items: mockIngredients,
      isLoading: true,
      error: 'Test error'
    }
  };

  test('selectIngredients', () => {
    const { selectIngredients } = require('../ingredientsSlice');
    expect(selectIngredients(mockState as any)).toEqual(mockIngredients);
  });

  test('selectIngredientsLoading', () => {
    const { selectIngredientsLoading } = require('../ingredientsSlice');
    expect(selectIngredientsLoading(mockState as any)).toBe(true);
  });

  test('selectIngredientsError', () => {
    const { selectIngredientsError } = require('../ingredientsSlice');
    expect(selectIngredientsError(mockState as any)).toBe('Test error');
  });
});

// Дополнительный тест для проверки начального состояния
describe('ingredientsSlice initial state', () => {
  test('should return initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });
});
