import reducer, {
  fetchProfileOrders,
  clearProfileOrders,
  ProfileOrdersState,
  profileOrderInitialState
} from '../profileOrdersSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: 'order1',
    ingredients: ['ing1', 'ing2'],
    status: 'done',
    name: 'Profile Order 1',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    number: 1
  },
  {
    _id: 'order2',
    ingredients: ['ing3', 'ing4'],
    status: 'pending',
    name: 'Profile Order 2',
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02',
    number: 2
  }
];

// Мокаем API вызов
jest.mock('@api', () => ({
  getOrdersApi: jest.fn()
}));

describe('profileOrdersSlice async actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchProfileOrders', () => {
    test('should handle fetchProfileOrders.pending - устанавливает isLoading в true и сбрасывает ошибку', () => {
      const action = { type: fetchProfileOrders.pending.type };
      const result = reducer(profileOrderInitialState, action);

      expect(result).toEqual({
        ...profileOrderInitialState,
        isLoading: true,
        error: null
      });
    });

    test('should handle fetchProfileOrders.fulfilled - сохраняет заказы профиля и вычисляет total/totalToday', () => {
      const action = {
        type: fetchProfileOrders.fulfilled.type,
        payload: mockOrders
      };
      const result = reducer(
        { ...profileOrderInitialState, isLoading: true },
        action
      );

      expect(result).toEqual({
        orders: mockOrders,
        total: 2, // длина массива orders
        totalToday: 2, // длина массива orders
        isLoading: false,
        error: null
      });
    });

    test('should handle fetchProfileOrders.rejected - сохраняет ошибку и сбрасывает isLoading', () => {
      const errorMessage = 'Failed to fetch profile orders';
      const action = {
        type: fetchProfileOrders.rejected.type,
        payload: errorMessage
      };
      const result = reducer(
        { ...profileOrderInitialState, isLoading: true },
        action
      );

      expect(result).toEqual({
        ...profileOrderInitialState,
        isLoading: false,
        error: errorMessage
      });
    });
  });

  describe('sync actions', () => {
    test('should handle clearProfileOrders - очищает заказы профиля', () => {
      const stateWithData: ProfileOrdersState = {
        orders: mockOrders,
        total: 2,
        totalToday: 2,
        isLoading: false,
        error: null
      };

      const result = reducer(stateWithData, clearProfileOrders());

      expect(result).toEqual(profileOrderInitialState);
    });

    test('should return initial state for unknown action', () => {
      const result = reducer(profileOrderInitialState, {
        type: 'UNKNOWN_ACTION'
      });
      expect(result).toEqual(profileOrderInitialState);
    });
  });
});

// Тесты для селекторов
describe('profileOrdersSlice selectors', () => {
  const mockState = {
    profileOrders: {
      orders: mockOrders,
      total: 2,
      totalToday: 2,
      isLoading: true,
      error: 'Test error'
    }
  };

  test('selectProfileOrdersState', () => {
    const { selectProfileOrdersState } = require('../profileOrdersSlice');
    expect(selectProfileOrdersState(mockState as any)).toEqual(
      mockState.profileOrders
    );
  });

  test('selectProfileOrders', () => {
    const { selectProfileOrders } = require('../profileOrdersSlice');
    expect(selectProfileOrders(mockState as any)).toEqual(mockOrders);
  });

  test('selectProfileOrdersTotal', () => {
    const { selectProfileOrdersTotal } = require('../profileOrdersSlice');
    expect(selectProfileOrdersTotal(mockState as any)).toBe(2);
  });

  test('selectProfileOrdersTotalToday', () => {
    const { selectProfileOrdersTotalToday } = require('../profileOrdersSlice');
    expect(selectProfileOrdersTotalToday(mockState as any)).toBe(2);
  });

  test('selectProfileOrdersLoading', () => {
    const { selectProfileOrdersLoading } = require('../profileOrdersSlice');
    expect(selectProfileOrdersLoading(mockState as any)).toBe(true);
  });

  test('selectProfileOrdersError', () => {
    const { selectProfileOrdersError } = require('../profileOrdersSlice');
    expect(selectProfileOrdersError(mockState as any)).toBe('Test error');
  });
});
