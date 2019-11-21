context('checks navigation after logging in', () => {
  beforeEach(() => {
    //cy.visit('https://demo.avalonmediasystem.org')
	cy.visit('https://spruce.dlib.indiana.edu')
  })


  //checks navigation to Browse
  it('.browse_navigation() - click on a DOM element', () => {
	cy.get(' a[href*="sign_in"] ').first().click()
	cy.get('form').within(() => {
		cy.get('#auth_key').type('archivist1@example.com').should('have.value', 'archivist1@example.com') // Only yield inputs within form
		cy.get('#password').type('archivist1') // Only yield textareas within form
		})
	cy.get('button[type=submit]').last().click()
	cy.contains('Browse').click()
  })


  //checks navigation to Manage content
  it('.manage_content() - click on a DOM element', () => {
	cy.get(' a[href*="sign_in"] ').first().click()
	cy.get('form').within(() => {
		cy.get('#auth_key').type('archivist1@example.com').should('have.value', 'archivist1@example.com') // Only yield inputs within form
		cy.get('#password').type('archivist1') // Only yield textareas within form
		})
	cy.get('button[type=submit]').last().click()
	cy.contains('Manage Content')//.click()
	cy.contains('Manage').click()
	cy.visit('https://spruce.dlib.indiana.edu/admin/collections')
	cy.contains('Skip to main content')
	cy.contains('Create Collection')
	cy.contains('Title')
	cy.contains('Items')
	cy.contains('Managers')
	cy.contains('Description')
	cy.contains('My Collections')
  })

  //checks naviagtion to Manage Groups
  it('.manage_groups() - click on a DOM element', () => {
	cy.get(' a[href*="sign_in"] ').first().click()
	cy.get('form').within(() => {
		cy.get('#auth_key').type('archivist1@example.com').should('have.value', 'archivist1@example.com') // Only yield inputs within form
		cy.get('#password').type('archivist1') // Only yield textareas within form
		})
	cy.get('button[type=submit]').last().click()
	cy.contains('Manage Groups')//.click()
	cy.contains('Manage').click()
	cy.visit('https://spruce.dlib.indiana.edu/admin/groups')
	cy.contains('System Groups')
	cy.contains('Additional Groups')
	cy.contains('Group Name')
	cy.contains('group_manager')
	cy.contains('administrator')
	cy.contains('manager')
  })



  //checks naviagtion to Playlist
  it('.playlists() - click on a DOM element', () => {
	cy.get(' a[href*="sign_in"] ').first().click()
	cy.get('form').within(() => {
		cy.get('#auth_key').type('archivist1@example.com').should('have.value', 'archivist1@example.com') // Only yield inputs within form
		cy.get('#password').type('archivist1') // Only yield textareas within form
		})
	cy.get('button[type=submit]').last().click()
	cy.contains('Playlists').click()
	cy.url().should('eq', 'https://spruce.dlib.indiana.edu/playlists')
	cy.contains('Playlists')
	cy.contains('Create New Playlist')
  })

  //is able to sign out
  it('.signout() - click on a DOM element', () => {
	cy.get(' a[href*="sign_in"] ').first().click()
	cy.get('form').within(() => {
		cy.get('#auth_key').type('archivist1@example.com').should('have.value', 'archivist1@example.com') // Only yield inputs within form
		cy.get('#password').type('archivist1') // Only yield textareas within form
		})
	cy.get('button[type=submit]').last().click()
	cy.contains('Sign out').click()
	cy.url().should('eq', 'https://spruce.dlib.indiana.edu/')
  })


  //Search - is able to enter keyword and perform search
  it('.search() - click on a DOM element', () => {
	cy.get('#searchField').type('lunchroom').should('have.value', 'lunchroom') // Only yield inputs within form
	cy.get('#global-search-submit').click()
	cy.url().should('eq', 'https://spruce.dlib.indiana.edu/catalog?utf8=%E2%9C%93&search_field=all_fields&q=lunchroom')
  })



})

