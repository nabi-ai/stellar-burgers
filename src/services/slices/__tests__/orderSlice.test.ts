import reducer, {
  createOrder,
  fetchOrderByNumber,
  clearCreated,
  OrderState
} from '../orderSlice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: 'order1',
  ingredients: ['ing1', 'ing2'],
  status: 'done',
  name: 'Test Order',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  number: 12345
};

const initialState: OrderState = {
  created: null,
  current: null,
  isLoading: false,
  error: null
};

// Мокаем API вызовы
jest.mock('@api', () => ({
  orderBurgerApi: jest.fn(),
  getOrderByNumberApi: jest.fn()
}));

describe('orderSlice async actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    test('should handle createOrder.pending', () => {
      const action = { type: createOrder.pending.type };
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    test('should handle createOrder.fulfilled', () => {
      const action = {
        type: createOrder.fulfilled.type,
        payload: mockOrder
      };
      const result = reducer({ ...initialState, isLoading: true }, action);

      expect(result).toEqual({
        ...initialState,
        isLoading: false,
        created: mockOrder,
        error: null
      });
    });

    test('should handle createOrder.rejected', () => {
      const errorMessage = 'Failed to create order';
      const action = {
        type: createOrder.rejected.type,
        payload: errorMessage
      };
      const result = reducer({ ...initialState, isLoading: true }, action);

      expect(result).toEqual({
        ...initialState,
        isLoading: false,
        error: errorMessage
      });
    });
  });

  describe('fetchOrderByNumber', () => {
    test('should handle fetchOrderByNumber.pending', () => {
      const action = { type: fetchOrderByNumber.pending.type };
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    test('should handle fetchOrderByNumber.fulfilled', () => {
      const action = {
        type: fetchOrderByNumber.fulfilled.type,
        payload: mockOrder
      };
      const result = reducer({ ...initialState, isLoading: true }, action);

      expect(result).toEqual({
        ...initialState,
        isLoading: false,
        current: mockOrder,
        error: null
      });
    });

    test('should handle fetchOrderByNumber.rejected', () => {
      const errorMessage = 'Order not found';
      const action = {
        type: fetchOrderByNumber.rejected.type,
        payload: errorMessage
      };
      const result = reducer({ ...initialState, isLoading: true }, action);

      expect(result).toEqual({
        ...initialState,
        isLoading: false,
        error: errorMessage
      });
    });
  });

  describe('sync actions', () => {
    test('should handle clearCreated', () => {
      const stateWithOrder: OrderState = {
        ...initialState,
        created: mockOrder
      };

      const result = reducer(stateWithOrder, clearCreated());

      expect(result).toEqual({
        ...stateWithOrder,
        created: null
      });
    });

    test('should return initial state for unknown action', () => {
      const result = reducer(initialState, { type: 'UNKNOWN_ACTION' });
      expect(result).toEqual(initialState);
    });
  });
});

// Дополнительные тесты для селекторов (опционально)
describe('orderSlice selectors', () => {
  const mockState = {
    order: {
      created: mockOrder,
      current: null,
      isLoading: true,
      error: 'Test error'
    }
  } as any;

  test('selectOrderState', () => {
    const { selectOrderState } = require('../orderSlice');
    expect(selectOrderState(mockState)).toEqual(mockState.order);
  });

  test('selectCreatedOrder', () => {
    const { selectCreatedOrder } = require('../orderSlice');
    expect(selectCreatedOrder(mockState)).toBe(mockOrder);
  });

  test('selectOrderLoading', () => {
    const { selectOrderLoading } = require('../orderSlice');
    expect(selectOrderLoading(mockState)).toBe(true);
  });

  test('selectOrderError', () => {
    const { selectOrderError } = require('../orderSlice');
    expect(selectOrderError(mockState)).toBe('Test error');
  });
});
