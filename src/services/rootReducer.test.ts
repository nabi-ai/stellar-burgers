import rootReducer from './RootReducer';

describe('rootReducer', () => {
  it('возвращает initialState при неизвестном экшене', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const actual = rootReducer(undefined, unknownAction);

    // Проверяем структуру состояния
    expect(actual).toEqual({
      ingredients: expect.any(Object),
      auth: expect.any(Object),
      burgerConstructor: expect.any(Object),
      order: expect.any(Object),
      feed: expect.any(Object),
      profileOrders: expect.any(Object),
      profile: expect.any(Object)
    });
  });
});
