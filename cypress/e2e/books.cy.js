describe('Books', () => {
  it('can create, read, update and delete books', () => {
    //list books
    cy.visit('/')
    cy.get('[data-cy=link-to-books]').click()
    //create books
    cy.get('[href="/libros/crear"]').click()
    .get('[data-cy=input-book-title]')
    .type('New book from cypress')
    .get('[data-cy=button-submit-book]')
    .click()
    .get('[data-cy=book-list]')
    .contains('New book from cypress')
    //Show Book
    cy.get('[data-cy^=link-to-visit-book-]')
    .last()
    .click()
    .get('h1').should('contain.text', 'New book from cypress')
    .get('[href="/libros"]').click()
    //Edit book
    cy.get('[data-cy^=link-to-edit-book-]')
    .last()
    .click()
    .get('[data-cy=input-book-title]')
    .clear()
    .type('Book edited from cypress')
    .get('[data-cy=button-submit-book]')
    .click()
    .get('[data-cy=book-list]')
    .contains('Book edited from cypress')
    //delete
    cy.get('[data-cy^=button-to-delete-book-]')
    .last()
    .click().wait(2000)//este delay para que no vaya tan rapido y obtenga el elemento antes de borrarlo
    .get('[data-cy^=link-to-visit-book-]')
    .last().should('not.contain.text', 'Book edited from cypress')
  })
})