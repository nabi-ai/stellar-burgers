import reducer, {
  setUser,
  startEditing,
  cancelEditing,
  updateProfileData,
  saveProfileData,
  setProfileLoading,
  setProfileError,
  clearProfile,
  ProfileState,
  profileSliceInitialState
} from '../profileSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  name: 'Test User',
  email: 'test@example.com'
};

describe('profileSlice', () => {
  describe('sync actions', () => {
    test('should return initial state', () => {
      const result = reducer(undefined, { type: '' });
      expect(result).toEqual(profileSliceInitialState);
    });

    test('should handle setUser - устанавливает пользователя и originalData', () => {
      const action = setUser(mockUser);
      const result = reducer(profileSliceInitialState, action);

      expect(result).toEqual({
        ...profileSliceInitialState,
        userData: mockUser,
        originalData: mockUser
      });
    });

    test('should handle startEditing - начинает редактирование и сохраняет originalData', () => {
      const stateWithUser: ProfileState = {
        ...profileSliceInitialState,
        userData: mockUser
      };

      const action = startEditing();
      const result = reducer(stateWithUser, action);

      expect(result).toEqual({
        ...stateWithUser,
        isEditing: true,
        originalData: mockUser
      });
    });

    test('should handle cancelEditing - отменяет редактирование и восстанавливает данные', () => {
      const modifiedUser = { ...mockUser, name: 'Modified User' };
      const stateWithChanges: ProfileState = {
        userData: modifiedUser,
        isEditing: true,
        originalData: mockUser,
        isLoading: false,
        error: null
      };

      const action = cancelEditing();
      const result = reducer(stateWithChanges, action);

      expect(result).toEqual({
        ...stateWithChanges,
        isEditing: false,
        userData: mockUser // восстановлены исходные данные
      });
    });

    test('should handle updateProfileData - обновляет данные пользователя', () => {
      const stateWithUser: ProfileState = {
        ...profileSliceInitialState,
        userData: mockUser
      };

      const updatedData = { name: 'Updated User' };
      const action = updateProfileData(updatedData);
      const result = reducer(stateWithUser, action);

      expect(result).toEqual({
        ...stateWithUser,
        userData: {
          ...mockUser,
          ...updatedData
        }
      });
    });

    test('should handle saveProfileData - сохраняет изменения и завершает редактирование', () => {
      const stateWithChanges: ProfileState = {
        userData: { ...mockUser, name: 'Updated User' },
        isEditing: true,
        originalData: mockUser,
        isLoading: false,
        error: 'Some error'
      };

      const action = saveProfileData();
      const result = reducer(stateWithChanges, action);

      expect(result).toEqual({
        ...stateWithChanges,
        isEditing: false,
        originalData: stateWithChanges.userData, // сохраняет текущие данные как original
        error: null // сбрасывает ошибку
      });
    });

    test('should handle setProfileLoading - устанавливает статус загрузки', () => {
      const action = setProfileLoading(true);
      const result = reducer(profileSliceInitialState, action);

      expect(result).toEqual({
        ...profileSliceInitialState,
        isLoading: true
      });
    });

    test('should handle setProfileError - устанавливает ошибку', () => {
      const errorMessage = 'Profile error';
      const action = setProfileError(errorMessage);
      const result = reducer(profileSliceInitialState, action);

      expect(result).toEqual({
        ...profileSliceInitialState,
        error: errorMessage
      });
    });

    test('should handle clearProfile - очищает все данные профиля', () => {
      const stateWithData: ProfileState = {
        userData: mockUser,
        isEditing: true,
        originalData: mockUser,
        isLoading: false,
        error: 'Some error'
      };

      const action = clearProfile();
      const result = reducer(stateWithData, action);

      expect(result).toEqual(profileSliceInitialState);
    });
  });

  describe('selectors', () => {
    const mockState = {
      profile: {
        userData: mockUser,
        isEditing: true,
        originalData: { ...mockUser, name: 'Original User' },
        isLoading: false,
        error: null
      }
    };

    test('selectProfileState', () => {
      const { selectProfileState } = require('../profileSlice');
      expect(selectProfileState(mockState as any)).toEqual(mockState.profile);
    });

    test('selectProfileUser', () => {
      const { selectProfileUser } = require('../profileSlice');
      expect(selectProfileUser(mockState as any)).toEqual(mockUser);
    });

    test('selectProfileIsEditing', () => {
      const { selectProfileIsEditing } = require('../profileSlice');
      expect(selectProfileIsEditing(mockState as any)).toBe(true);
    });

    test('selectProfileOriginalData', () => {
      const { selectProfileOriginalData } = require('../profileSlice');
      expect(selectProfileOriginalData(mockState as any)).toEqual({
        ...mockUser,
        name: 'Original User'
      });
    });

    test('selectProfileLoading', () => {
      const { selectProfileLoading } = require('../profileSlice');
      expect(selectProfileLoading(mockState as any)).toBe(false);
    });

    test('selectProfileError', () => {
      const { selectProfileError } = require('../profileSlice');
      expect(selectProfileError(mockState as any)).toBe(null);
    });

    test('selectProfileHasChanges - возвращает true при изменениях', () => {
      const { selectProfileHasChanges } = require('../profileSlice');
      expect(selectProfileHasChanges(mockState as any)).toBe(true);
    });

    test('selectProfileHasChanges - возвращает false при отсутствии изменений', () => {
      const unchangedState = {
        profile: {
          userData: mockUser,
          originalData: mockUser,
          isEditing: false,
          isLoading: false,
          error: null
        }
      };
      const { selectProfileHasChanges } = require('../profileSlice');
      expect(selectProfileHasChanges(unchangedState as any)).toBe(false);
    });

    test('selectProfileHasChanges - возвращает false при отсутствии данных', () => {
      const emptyState = {
        profile: {
          userData: null,
          originalData: null,
          isEditing: false,
          isLoading: false,
          error: null
        }
      };
      const { selectProfileHasChanges } = require('../profileSlice');
      expect(selectProfileHasChanges(emptyState as any)).toBe(false);
    });
  });

  test('should return initial state for unknown action', () => {
    const result = reducer(profileSliceInitialState, {
      type: 'UNKNOWN_ACTION'
    });
    expect(result).toEqual(profileSliceInitialState);
  });
});
