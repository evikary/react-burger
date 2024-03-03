describe('All tests with modals', () => {
    const bun = {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0,
    };

    const ingredient1 = {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0,
    };

    const ingredient2 = {
        _id: '643d69a5c3f7b9001cfa0949',
        name: 'Мини-салат Экзо-Плантаго',
        type: 'main',
        proteins: 1,
        fat: 2,
        carbohydrates: 3,
        calories: 6,
        price: 4400,
        image: 'https://code.s3.yandex.net/react/code/salad.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
        __v: 0,
    };

    beforeEach(() => {
        cy.intercept('GET', 'ingredients', { fixture: 'ingredients' }).as('postIngredients');
        cy.intercept('POST', 'orders', { fixture: 'order' });
        cy.visit('http://localhost:3000/');
    });

    it('should open ingredient modal', () => {
        cy.intercept('GET', 'ingredients', { fixture: 'ingredients' });
        cy.contains('[data-testid="ingredients"] li', bun.name).click();
    });

    it('should open, check contents and close ingredient modal', () => {
        cy.contains('[data-testid="ingredients"] li', bun.name).click();
        cy.contains('#react-modals h2', 'Детали ингредиента');
        cy.contains('#react-modals p', bun.name);
        cy.contains('#react-modals [data-testid="calories"] div:nth-child(1) span:last', bun.calories);
        cy.contains('#react-modals [data-testid="calories"] div:nth-child(2) span:last', bun.proteins);
        cy.contains('#react-modals [data-testid="calories"] div:nth-child(3) span:last', bun.fat);
        cy.contains('#react-modals [data-testid="calories"] div:nth-child(4) span:last', bun.carbohydrates);
        cy.get('#react-modals svg').click();
        cy.get('#react-modals h2').should('not.exist');
    });

    it('should drag and drop bun and ingredients, open order modal, check contents, close modal', () => {
        const dataTransfer = new DataTransfer();

        cy.contains('[data-testid="ingredients"] li', bun.name).trigger('dragstart', { dataTransfer });
        cy.get('[data-testid="constructor"]').trigger('drop', { dataTransfer });

        cy.contains('[data-testid="ingredients"] li', ingredient1.name).trigger('dragstart', { dataTransfer });
        cy.get('[data-testid="constructor"]').trigger('drop', { dataTransfer });

        cy.contains('[data-testid="ingredients"] li', ingredient2.name).trigger('dragstart', { dataTransfer });
        cy.get('[data-testid="constructor"]').trigger('drop', { dataTransfer });

        cy.contains('[data-testid="constructor"]', bun.name);
        cy.contains('[data-testid="constructor"]', ingredient1.name);
        cy.contains('[data-testid="constructor"]', ingredient2.name);

        cy.get('[data-testid="orderBtn"]').click();

        cy.get('[name=email]').type('daria_more10@mail.ru');
        cy.get('[name=password]').type('12345678');
        cy.get('[data-testid="loginBtn"]').click();

        cy.get('[data-testid="orderBtn"]').click();
        cy.contains('#react-modals', '35698');

        cy.get('#react-modals svg').click();
        cy.contains('#react-modals', '35698').should('not.exist');
    });
});
