context('Actions', () => {
  beforeEach(() => {
    //cy.visit('https://demo.avalonmediasystem.org')
	cy.visit('https://spruce.dlib.indiana.edu')
  })


  
  //validates presence of header and footer on homepage for logged-in user
  it('.sign_in_feature_testing() - click on a DOM element', () => {
	cy.get(' a[href*="sign_in"] ').first().click()
    //cy.get('#auth_key').type('sumith@example.com').should('have.value', 'sumith@example.com')
    //cy.get('#password').type('sumith').should('have.value', 'sumith')
	cy.get('form').within(() => {
		cy.get('#auth_key').type('archivist1@example.com').should('have.value', 'archivist1@example.com') // Only yield inputs within form
		cy.get('#password').type('archivist1') // Only yield textareas within form
		})
	cy.get('button[type=submit]').last().click()
	cy.get('#timelines_nav')
	cy.get('#bookmarks_nav')
	cy.get('#manageDropdown')
	cy.get('#playlists_nav')

  })

  //validates absence of features when not logged in
  it('.public_user_feature_testing() - click on a DOM element', () => {
	//cy.get('a[href*="catalog"] ').first().click()
	cy.get('#timelines_nav').should('not.exist');
	cy.get('#bookmarks_nav').should('not.exist');
	cy.get('#playlists_nav').should('not.exist');
	cy.get('#manageDropdown').should('not.exist');
	
  })

  //checks vertical navigation options on homepage
  it('.navigation_bar() - click on a DOM element', () => {
	cy.get('#sidebar')//.should('not.exist');
	cy.get('#facet-panel-collapse')	
  })

  //checks navigation to external links
  it('.external_links() - click on a DOM element', () => {
	cy.get(' a[href*="/"] ').first().click()	
  })

  //checks navigation to Contact us page
  it('.Contact_us() - click on a DOM element', () => {
	cy.contains('Contact Us').click()
	//cy.url()
	cy.url().should('eq', 'https://spruce.dlib.indiana.edu/comments')
	cy.contains('Name')
	cy.contains('Email address')
	cy.contains('Confirm email address')
	cy.contains('Subject')
	cy.contains('Comments')
	cy.contains('Submit comments')
  })


  //verifies presence of features after login
  it('.feature_verficivation_login() - click on a DOM element', () => {
	cy.get(' a[href*="sign_in"] ').first().click()
    //cy.get('#auth_key').type('sumith@example.com').should('have.value', 'sumith@example.com')
    //cy.get('#password').type('sumith').should('have.value', 'sumith')
	cy.get('form').within(() => {
		cy.get('#auth_key').type('archivist1@example.com').should('have.value', 'archivist1@example.com') // Only yield inputs within form
		cy.get('#password').type('archivist1') // Only yield textareas within form
		})
	cy.get('button[type=submit]').last().click()
	cy.contains('Playlists')
	cy.contains('Manage Content')
	cy.contains('Manage Groups')
	cy.contains('Sign out')
  })


  //Sign in page
  it('.describe_sign_in_page() - click on a DOM element', () => {
	cy.get(' a[href*="sign_in"] ').first().click()
	cy.contains('Login:')
	cy.contains('Password:')
	cy.contains('Create an Identity')
	cy.contains('Connect')
	
  })

  //validates presence of items on register page
  it('.validate_register_page() - click on a DOM element', () => {
	cy.visit('https://spruce.dlib.indiana.edu/users/auth/identity/register')
	cy.contains('Name:')
	cy.contains('Email:')
	cy.contains('Password:')
	cy.contains('Confirm Password:')
	cy.contains('Connect')	
  })

  //is able to create new account
  it('.create_new_account() - click on a DOM element', () => {
	cy.visit('https://spruce.dlib.indiana.edu/users/auth/identity/register')
	cy.get('form').within(() => {
		cy.get('#name').type('Sumith').should('have.value', 'Sumith') // Only yield inputs within form
		cy.get('#email').type('sumith3@example.com').should('have.value', 'sumith3@example.com') // Only yield inputs within form
		cy.get('#password').type('sumith3') // Only yield textareas within form
		cy.get('#password_confirmation').type('sumith3') // Only yield textareas within form
		})
	cy.get('button[type=submit]').last().click()
	
  })

})
