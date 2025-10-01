declare namespace Cypress {
  interface Chainable {
    /**
     * Авторизация пользователя
     */
    login(): Chainable<void>;
    /**
     * Добавление ингредиента в конструктор
     */
    addIngredient(ingredientName: string): Chainable<void>;
  }
}

Cypress.Commands.add('login', () => {
  cy.setCookie('accessToken', 'fake-access-token');
  cy.window().then((win) => {
    win.localStorage.setItem('refreshToken', 'fake-refresh-token');
  });
});

Cypress.Commands.add('addIngredient', (ingredientName: string) => {
  cy.contains('[data-testid="ingredient-card"]', ingredientName).within(() => {
    cy.get('button').first().click();
  });
});
