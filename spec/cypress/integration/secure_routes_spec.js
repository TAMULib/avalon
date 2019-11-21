context('checks navigation after logging in', () => {
  beforeEach(() => {
    //cy.visit('https://demo.avalonmediasystem.org')
	cy.visit('https://spruce.dlib.indiana.edu')
  })


  // '/about' - should provide access to admins
  it('.about_access_admins() - click on a DOM element', () => {
	cy.get(' a[href*="sign_in"] ').first().click()
	cy.get('form').within(() => {
		cy.get('#auth_key').type('archivist1@example.com').should('have.value', 'archivist1@example.com') // Only yield inputs within form
		cy.get('#password').type('archivist1') // Only yield textareas within form
		})
	cy.get('button[type=submit]').last().click()
	cy.visit('https://spruce.dlib.indiana.edu/about')
	cy.contains('Environment')
  })

  // '/about' - should not provide access to regular users
  it('.about_access_regular_users() - click on a DOM element', () => {
	cy.get(' a[href*="sign_in"] ').first().click()
	cy.get('form').within(() => {
		cy.get('#auth_key').type('sumith3@example.com').should('have.value', 'sumith3@example.com') // Only yield inputs within form
		cy.get('#password').type('sumith3') // Only yield textareas within form
		})
	cy.get('button[type=submit]').last().click()
	cy.visit('https://spruce.dlib.indiana.edu/about')
	cy.contains('Environment').should('not.exist')
  })

  // '/about' - should not provide access to anonymous users
  it('.about_access_anonymous_users() - click on a DOM element', () => {
	cy.visit('https://spruce.dlib.indiana.edu/about')
	cy.contains('Environment').should('not.exist')
  })





  // '/about/health' - should provide access to admins
  it('.health_access_admins() - click on a DOM element', () => {
	cy.get(' a[href*="sign_in"] ').first().click()
	cy.get('form').within(() => {
		cy.get('#auth_key').type('archivist1@example.com').should('have.value', 'archivist1@example.com') // Only yield inputs within form
		cy.get('#password').type('archivist1') // Only yield textareas within form
		})
	cy.get('button[type=submit]').last().click()
	cy.visit('https://spruce.dlib.indiana.edu/about/health')
	cy.contains('Service Health')
  })

  // '/about/health' - should not provide access to regular users
  it('.health_access_regular_users() - click on a DOM element', () => {
	cy.get(' a[href*="sign_in"] ').first().click()
	cy.get('form').within(() => {
		cy.get('#auth_key').type('sumith3@example.com').should('have.value', 'sumith3@example.com') // Only yield inputs within form
		cy.get('#password').type('sumith3') // Only yield textareas within form
		})
	cy.get('button[type=submit]').last().click()
	cy.visit('https://spruce.dlib.indiana.edu/about/health')
	cy.contains('Service Health').should('not.exist')
  })

  // '/about/health' - should not provide access to anonymous users
  it('.health_access_anonymous_users() - click on a DOM element', () => {
	cy.visit('https://spruce.dlib.indiana.edu/about/health')
	cy.contains('Service Health').should('not.exist')
  })

})
