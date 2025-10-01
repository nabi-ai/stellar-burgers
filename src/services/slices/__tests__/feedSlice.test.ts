import reducer, { fetchFeeds, clearFeed, FeedState } from '../feedSlice';
import { TOrder, TOrdersData } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: 'order1',
    ingredients: ['ing1', 'ing2'],
    status: 'done',
    name: 'Test Order 1',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    number: 1
  },
  {
    _id: 'order2',
    ingredients: ['ing3', 'ing4'],
    status: 'pending',
    name: 'Test Order 2',
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02',
    number: 2
  }
];

const mockFeedsData: TOrdersData = {
  orders: mockOrders,
  total: 100,
  totalToday: 10
};

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

// Мокаем API вызов
jest.mock('@api', () => ({
  getFeedsApi: jest.fn()
}));

describe('feedSlice async actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchFeeds', () => {
    test('should handle fetchFeeds.pending - устанавливает isLoading в true и сбрасывает ошибку', () => {
      const action = { type: fetchFeeds.pending.type };
      const result = reducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    test('should handle fetchFeeds.fulfilled - сохраняет данные ленты и сбрасывает isLoading', () => {
      const action = {
        type: fetchFeeds.fulfilled.type,
        payload: mockFeedsData
      };
      const result = reducer({ ...initialState, isLoading: true }, action);

      expect(result).toEqual({
        orders: mockOrders,
        total: 100,
        totalToday: 10,
        isLoading: false,
        error: null
      });
    });

    test('should handle fetchFeeds.rejected - сохраняет ошибку и сбрасывает isLoading', () => {
      const errorMessage = 'Network error';
      const action = {
        type: fetchFeeds.rejected.type,
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
    test('should handle clearFeed - очищает данные ленты', () => {
      const stateWithData: FeedState = {
        orders: mockOrders,
        total: 100,
        totalToday: 10,
        isLoading: false,
        error: null
      };

      const result = reducer(stateWithData, clearFeed());

      expect(result).toEqual(initialState);
    });

    test('should return initial state for unknown action', () => {
      const result = reducer(initialState, { type: 'UNKNOWN_ACTION' });
      expect(result).toEqual(initialState);
    });
  });
});

// Тесты для селекторов
describe('feedSlice selectors', () => {
  const mockState = {
    feed: {
      orders: mockOrders,
      total: 100,
      totalToday: 10,
      isLoading: true,
      error: 'Test error'
    }
  };

  test('selectFeedState', () => {
    const { selectFeedState } = require('../feedSlice');
    expect(selectFeedState(mockState as any)).toEqual(mockState.feed);
  });

  test('selectFeedOrders', () => {
    const { selectFeedOrders } = require('../feedSlice');
    expect(selectFeedOrders(mockState as any)).toEqual(mockOrders);
  });

  test('selectFeedTotal', () => {
    const { selectFeedTotal } = require('../feedSlice');
    expect(selectFeedTotal(mockState as any)).toBe(100);
  });

  test('selectFeedTotalToday', () => {
    const { selectFeedTotalToday } = require('../feedSlice');
    expect(selectFeedTotalToday(mockState as any)).toBe(10);
  });

  test('selectFeedLoading', () => {
    const { selectFeedLoading } = require('../feedSlice');
    expect(selectFeedLoading(mockState as any)).toBe(true);
  });

  test('selectFeedError', () => {
    const { selectFeedError } = require('../feedSlice');
    expect(selectFeedError(mockState as any)).toBe('Test error');
  });
});
