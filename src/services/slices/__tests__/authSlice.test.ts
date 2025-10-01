import reducer, {
  loginUser,
  registerUser,
  fetchUser,
  updateUser,
  logoutUser,
  initialize,
  authSliceInitialState
} from '../authSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  name: 'Test User',
  email: 'test@example.com'
};

// Мокаем API и утилиты
jest.mock('@api', () => ({
  loginUserApi: jest.fn(),
  registerUserApi: jest.fn(),
  logoutApi: jest.fn(),
  getUserApi: jest.fn(),
  updateUserApi: jest.fn()
}));

describe('authSlice async actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loginUser', () => {
    test('should handle loginUser.pending', () => {
      const action = { type: loginUser.pending.type };
      const result = reducer(authSliceInitialState, action);

      expect(result).toEqual({
        ...authSliceInitialState,
        isLoading: true,
        error: null
      });
    });

    test('should handle loginUser.fulfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: mockUser
      };
      const result = reducer(
        { ...authSliceInitialState, isLoading: true },
        action
      );

      expect(result).toEqual({
        ...authSliceInitialState,
        isLoading: false,
        userData: mockUser,
        isInitialized: true,
        error: null
      });
    });

    test('should handle loginUser.rejected', () => {
      const errorMessage = 'Login failed';
      const action = {
        type: loginUser.rejected.type,
        payload: errorMessage
      };
      const result = reducer(
        { ...authSliceInitialState, isLoading: true },
        action
      );

      expect(result).toEqual({
        ...authSliceInitialState,
        isLoading: false,
        error: errorMessage
      });
    });
  });

  describe('registerUser', () => {
    test('should handle registerUser.pending', () => {
      const action = { type: registerUser.pending.type };
      const result = reducer(authSliceInitialState, action);

      expect(result).toEqual({
        ...authSliceInitialState,
        isLoading: true,
        error: null
      });
    });

    test('should handle registerUser.fulfilled', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: mockUser
      };
      const result = reducer(
        { ...authSliceInitialState, isLoading: true },
        action
      );

      expect(result).toEqual({
        ...authSliceInitialState,
        isLoading: false,
        userData: mockUser,
        isInitialized: true,
        error: null
      });
    });

    test('should handle registerUser.rejected', () => {
      const errorMessage = 'Registration failed';
      const action = {
        type: registerUser.rejected.type,
        payload: errorMessage
      };
      const result = reducer(
        { ...authSliceInitialState, isLoading: true },
        action
      );

      expect(result).toEqual({
        ...authSliceInitialState,
        isLoading: false,
        error: errorMessage
      });
    });
  });

  describe('fetchUser', () => {
    test('should handle fetchUser.pending', () => {
      const action = { type: fetchUser.pending.type };
      const result = reducer(authSliceInitialState, action);

      expect(result).toEqual({
        ...authSliceInitialState,
        isLoading: true,
        error: null
      });
    });

    test('should handle fetchUser.fulfilled', () => {
      const action = {
        type: fetchUser.fulfilled.type,
        payload: mockUser
      };
      const result = reducer(
        { ...authSliceInitialState, isLoading: true },
        action
      );

      expect(result).toEqual({
        ...authSliceInitialState,
        isLoading: false,
        userData: mockUser,
        isInitialized: true,
        error: null
      });
    });

    test('should handle fetchUser.rejected', () => {
      const errorMessage = 'Failed to fetch user';
      const action = {
        type: fetchUser.rejected.type,
        payload: errorMessage
      };
      const result = reducer(
        { ...authSliceInitialState, isLoading: true },
        action
      );

      expect(result).toEqual({
        ...authSliceInitialState,
        isLoading: false,
        isInitialized: true,
        userData: null,
        error: errorMessage
      });
    });
  });

  describe('updateUser', () => {
    test('should handle updateUser.pending', () => {
      const action = { type: updateUser.pending.type };
      const result = reducer(
        { ...authSliceInitialState, userData: mockUser },
        action
      );

      expect(result).toEqual({
        ...authSliceInitialState,
        userData: mockUser,
        isLoading: true,
        error: null
      });
    });

    test('should handle updateUser.fulfilled', () => {
      const updatedUser = { ...mockUser, name: 'Updated User' };
      const action = {
        type: updateUser.fulfilled.type,
        payload: updatedUser
      };
      const result = reducer(
        { ...authSliceInitialState, userData: mockUser, isLoading: true },
        action
      );

      expect(result).toEqual({
        ...authSliceInitialState,
        isLoading: false,
        userData: updatedUser,
        error: null
      });
    });

    test('should handle updateUser.rejected', () => {
      const errorMessage = 'Update failed';
      const action = {
        type: updateUser.rejected.type,
        payload: errorMessage
      };
      const result = reducer(
        { ...authSliceInitialState, userData: mockUser, isLoading: true },
        action
      );

      expect(result).toEqual({
        ...authSliceInitialState,
        userData: mockUser,
        isLoading: false,
        error: errorMessage
      });
    });
  });

  describe('logoutUser', () => {
    test('should handle logoutUser.pending', () => {
      const action = { type: logoutUser.pending.type };
      const result = reducer(
        { ...authSliceInitialState, userData: mockUser },
        action
      );

      expect(result).toEqual({
        ...authSliceInitialState,
        userData: mockUser,
        isLoading: true,
        error: null
      });
    });

    test('should handle logoutUser.fulfilled', () => {
      const action = { type: logoutUser.fulfilled.type };
      const result = reducer(
        { ...authSliceInitialState, userData: mockUser, isLoading: true },
        action
      );

      expect(result).toEqual({
        ...authSliceInitialState,
        isLoading: false,
        userData: null,
        error: null
      });
    });

    test('should handle logoutUser.rejected', () => {
      const errorMessage = 'Logout failed';
      const action = {
        type: logoutUser.rejected.type,
        payload: errorMessage
      };
      const result = reducer(
        { ...authSliceInitialState, userData: mockUser, isLoading: true },
        action
      );

      expect(result).toEqual({
        ...authSliceInitialState,
        userData: mockUser,
        isLoading: false,
        error: errorMessage
      });
    });
  });
});

describe('authSlice sync actions', () => {
  test('should handle initialize', () => {
    const action = initialize();
    const result = reducer(authSliceInitialState, action);

    expect(result).toEqual({
      ...authSliceInitialState,
      isInitialized: true
    });
  });

  test('should return initial state for unknown action', () => {
    const result = reducer(authSliceInitialState, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(authSliceInitialState);
  });
});
