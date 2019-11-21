context('checks navigation after logging in', () => {
  beforeEach(() => {
    //cy.visit('https://demo.avalonmediasystem.org')
	cy.visit('https://spruce.dlib.indiana.edu')
  })


  // 'Error when creating duplicate user
  it('.duplicate_user_error() - click on a DOM element', () => {
	cy.visit('https://spruce.dlib.indiana.edu/users/auth/identity/register')
	cy.get('form').within(() => {
		cy.get('#name').type('test1').should('have.value', 'test1') // Only yield inputs within form
		cy.get('#email').type('test1@example.com').should('have.value', 'test1@example.com') // Only yield inputs within form
		cy.get('#password').type('test1') // Only yield textareas within form
		cy.get('#password_confirmation').type('test1') // Only yield textareas within form
		})
	cy.get('button[type=submit]').last().click()

	cy.visit('https://spruce.dlib.indiana.edu/users/auth/identity/register')
	cy.get('form').within(() => {
		cy.get('#name').type('test1').should('have.value', 'test1') // Only yield inputs within form
		cy.get('#email').type('test1@example.com').should('have.value', 'test1@example.com') // Only yield inputs within form
		cy.get('#password').type('test1') // Only yield textareas within form
		cy.get('#password_confirmation').type('test1') // Only yield textareas within form
		})
	cy.get('button[type=submit]').last().click()

	cy.contains('Email is taken.')
  })
})