import reducer, {
  setBun,
  addIngredient,
  removeIngredient,
  reorderItems,
  reset,
  ConstructorState
} from '../burgerConstructorSlice';
import { TIngredient } from '@utils-types';

const bun: TIngredient = {
  _id: 'bun1',
  name: 'Булка 1',
  type: 'bun',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 50,
  image: '',
  image_large: '',
  image_mobile: ''
};

const sauce: TIngredient = { ...bun, _id: 'id2', type: 'sauce', name: 'Соус' };

describe('constructorSlice', () => {
  const initialState: ConstructorState = {
    bun: null,
    items: [],
    showOrderPreparingStarted: false
  };

  it('возвращает initialState', () => {
    const result = reducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('добавляет булку', () => {
    const next = reducer(undefined, setBun(bun));
    expect(next.bun?._id).toBe('bun1');
    expect(next.showOrderPreparingStarted).toBe(false);
  });

  it('добавляет начинку', () => {
    const next = reducer(undefined, addIngredient(sauce));
    expect(next.items).toHaveLength(1);
    expect(next.items[0]).toMatchObject({
      ...sauce,
      id: expect.stringContaining(sauce._id)
    });
  });

  it('удаляет ингредиент', () => {
    const state = reducer(undefined, addIngredient(sauce));
    const index = 0;
    const next = reducer(state, removeIngredient(index));
    expect(next.items).toHaveLength(0);
  });

  it('меняет порядок - перемещает первый элемент в конец', () => {
    const first = { ...sauce, _id: '1', name: 'A' };
    const second = { ...sauce, _id: '2', name: 'B' };
    const third = { ...sauce, _id: '3', name: 'C' };

    let state = reducer(undefined, addIngredient(first));
    state = reducer(state, addIngredient(second));
    state = reducer(state, addIngredient(third));

    // Перемещаем первый элемент (A) в конец (позиция 2)
    const next = reducer(state, reorderItems({ from: 0, to: 2 }));

    expect(next.items).toHaveLength(3);
    expect(next.items[0]._id).toBe('2'); // B становится первым
    expect(next.items[1]._id).toBe('3'); // C становится вторым
    expect(next.items[2]._id).toBe('1'); // A становится последним
  });

  it('меняет порядок - перемещает последний элемент в начало', () => {
    const first = { ...sauce, _id: '1', name: 'A' };
    const second = { ...sauce, _id: '2', name: 'B' };
    const third = { ...sauce, _id: '3', name: 'C' };

    let state = reducer(undefined, addIngredient(first));
    state = reducer(state, addIngredient(second));
    state = reducer(state, addIngredient(third));

    // Перемещаем последний элемент (C) в начало (позиция 0)
    const next = reducer(state, reorderItems({ from: 2, to: 0 }));

    expect(next.items).toHaveLength(3);
    expect(next.items[0]._id).toBe('3'); // C становится первым
    expect(next.items[1]._id).toBe('1'); // A становится вторым
    expect(next.items[2]._id).toBe('2'); // B становится последним
  });

  it('меняет порядок - перемещает элемент в середину', () => {
    const first = { ...sauce, _id: '1', name: 'A' };
    const second = { ...sauce, _id: '2', name: 'B' };
    const third = { ...sauce, _id: '3', name: 'C' };
    const fourth = { ...sauce, _id: '4', name: 'D' };

    let state = reducer(undefined, addIngredient(first));
    state = reducer(state, addIngredient(second));
    state = reducer(state, addIngredient(third));
    state = reducer(state, addIngredient(fourth));

    // Перемещаем элемент с позиции 1 (B) на позицию 2
    const next = reducer(state, reorderItems({ from: 1, to: 2 }));

    expect(next.items).toHaveLength(4);
    expect(next.items[0]._id).toBe('1'); // A остается первым
    expect(next.items[1]._id).toBe('3'); // C становится вторым
    expect(next.items[2]._id).toBe('2'); // B становится третьим
    expect(next.items[3]._id).toBe('4'); // D остается последним
  });

  it('сбрасывает конструктор', () => {
    const filled = reducer(undefined, addIngredient(sauce));
    const next = reducer(filled, reset());
    expect(next).toEqual(initialState);
  });
});
