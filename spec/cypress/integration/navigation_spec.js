context('checks navigation after logging in', () => {

  //checks navigation to Browse
  it('.browse_navigation()', () => {
		cy.login('administrator')
			cy.visit('/')
	cy.contains('Browse').click()
  })


  //checks navigation to Manage content
  it('.manage_content()', () => {
		cy.login('administrator')
			cy.visit('/')
	cy.contains('Manage Content')//.click()
	cy.contains('Manage').click()
	cy.visit('/admin/collections')
	cy.contains('Skip to main content')
	cy.contains('Create Collection')
		//What if there are no collections yet
	cy.contains('Title')
	cy.contains('Items')
	cy.contains('Managers')
	cy.contains('Description')
	cy.contains('My Collections')
  })

  //checks naviagtion to Manage Groups
  it('.manage_groups()', () => {
		cy.login('administrator')
			cy.visit('/')
	cy.contains('Manage Groups')//.click()
	cy.contains('Manage').click()
	cy.visit('/admin/groups')
	cy.contains('System Groups')
	cy.contains('Additional Groups')
	cy.contains('Group Name')
	cy.contains('group_manager')
	cy.contains('administrator')
	cy.contains('manager')
  })



  //checks naviagtion to Playlist
  it('.playlists()', () => {
		cy.login('administrator')
			cy.visit('/')
	cy.contains('Playlists').click()
			//
	//cy.url().should('eq', 'https://spruce.dlib.indiana.edu/playlists')
	cy.contains('Playlists')
	cy.contains('Create New Playlist')
  })

  //is able to sign out
  it('.signout()', () => {
		cy.login('administrator')
			cy.visit('/')
	cy.contains('Sign out').click()
			//
	//cy.url().should('eq', 'https://spruce.dlib.indiana.edu/')
  })


  //Search - is able to enter keyword and perform search
  it('.search()', () => {
			cy.visit('/')
	cy.get('#searchField').type('lunchroom').should('have.value', 'lunchroom') // Only yield inputs within form
	cy.get('#global-search-submit').click()
		//
	//cy.url().should('eq', 'https://spruce.dlib.indiana.edu/catalog?utf8=%E2%9C%93&search_field=all_fields&q=lunchroom')
  })



})

