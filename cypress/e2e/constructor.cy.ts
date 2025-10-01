describe('Конструктор бургера', () => {
  beforeEach(() => {
    // Мокаем загрузку ингредиентов
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    // Мокаем авторизацию и создание заказа
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    // Устанавливаем токены авторизации
    cy.setCookie('accessToken', 'fake-access-token');
    localStorage.setItem('refreshToken', 'fake-refresh-token');

    cy.visit('/');
    cy.wait('@getUser');
    cy.wait('@getIngredients');
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('должен добавлять булку и соус в конструктор', () => {
      // Добавляем ингредиенты через кастомную команду
      cy.addIngredient('Краторная булка N-200i');
      cy.addIngredient('Соус Spicy-X');

      // Проверяем, что ингредиенты добавились в конструктор
      cy.get('[data-testid="constructor-bun"]').should('have.length', 2); // Верхняя и нижняя булка
      cy.get('[data-testid="constructor-ingredient"]').should('have.length', 1);
    });
  });

  describe('Модальное окно ингредиента', () => {
    it('должен открывать модальное окно при клике на ингредиент', () => {
      // Кликаем на ингредиент для открытия модального окна
      cy.get('[data-testid="ingredient-card"]')
        .contains('Соус Spicy-X')
        .click();

      // Проверяем, что модальное окно открылось с правильными данными
      cy.get('[data-testid="modal"]')
        .should('be.visible')
        .and('contain', 'Детали ингредиента')
        .and('contain', 'Соус Spicy-X');
    });

    it('должен закрывать модальное окно при клике на крестик', () => {
      cy.get('[data-testid="ingredient-card"]')
        .contains('Соус Spicy-X')
        .click();
      // Закрываем модальное окно крестиком
      cy.get('[data-testid="modal-close"]').click();
      cy.get('[data-testid="modal"]').should('not.exist');
    });

    it('должен закрывать модальное окно при клике на оверлей', () => {
      cy.get('[data-testid="ingredient-card"]')
        .contains('Соус Spicy-X')
        .click();
      // Закрываем модальное окно кликом на оверлей
      cy.get('[data-testid="modal-overlay"]').click({ force: true });
      cy.get('[data-testid="modal"]').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    it('должен оформлять заказ и очищать конструктор', () => {
      // Добавляем ингредиенты в конструктор
      cy.addIngredient('Краторная булка N-200i');
      cy.addIngredient('Соус Spicy-X');

      // Оформляем заказ
      cy.get('[data-testid="order-button"]').click();
      cy.wait('@createOrder');

      // Проверяем модальное окно с номером заказа
      cy.get('[data-testid="modal"]').should('contain', '1234');

      // Закрываем модальное окно
      cy.get('[data-testid="modal-close"]').click();

      // Проверяем очистку конструктора после заказа
      cy.get('[data-testid="constructor-bun"]').should('not.exist');
      cy.get('[data-testid="constructor-ingredient"]').should('have.length', 0);
    });
  });

  afterEach(() => {
    // Очищаем токены после теста
    cy.clearCookie('accessToken');
    localStorage.clear();
  });
});
