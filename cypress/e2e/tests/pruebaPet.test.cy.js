describe('Operaciones básicas con API PetStore', () => {
    before(() => {
        cy.fixture('data').then(function (information) {
            Cypress.data = information;
        })
    });

    it('Añadir una mascota a la tienda', () => {
        cy.request({
            method: 'POST',
            url: Cypress.config().baseUrl+'pet',
            body: Cypress.data.pet1
        })
        .then((response) => {
                expect(response.status).to.eq(200)
            });
    });
    it('Consultar la mascota ingresada', () => {
        const idPet = Cypress.data.pet1.id
        cy.request({
            method: 'GET',
            url: Cypress.config().baseUrl+'pet/'+idPet,
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).property('id').to.eq(idPet)
        });
    });

    it('Actualizar el nombre y el status de la mascota', () => {
        const idPet = Cypress.data.pet1.id
        const status = Cypress.data.status
        const nameChanged = Cypress.data.petUpdated.name
        cy.request({
            method: 'PUT',
            url: Cypress.config().baseUrl+'pet',
            body: Cypress.data.petUpdated
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).property('id').to.eq(idPet)
            expect(response.body).property('name').to.eq(nameChanged)
            expect(response.body).property('status').to.eq(status)
        });
    });

    it('Consultar la mascota modificada por status', () => {
        const idPet = Cypress.data.pet1.id
        const status = Cypress.data.status
        cy.request({
            method: 'GET',
            url: Cypress.config().baseUrl+'pet/findByStatus?status='+status,
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            const found = response.body.find(item => item.id === idPet)
            expect(found).property('status').to.eq(status)
            cy.writeFile('cypress/fixtures/endResult.json',response.body);
        });
    });
  });