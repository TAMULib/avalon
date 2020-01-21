context('checks navigation after logging in', () => {

  //checks navigation when create new playlist is accessed
  it('.create_playlists()', () => {
		cy.login('administrator')
			cy.visit('/')
	cy.contains('Playlists').click()
	cy.contains('Create New Playlist').click()
			//
	cy.url().should('include', '/playlists/new')
  })

  //is able to create private (default) playlist
  it('.validate_create_playlist()', () => {
		//cy.login('administrator')
			cy.visit('/')
		cy.login('administrator')
			cy.visit('/')
	cy.contains('Playlists').click()
	cy.contains('Create New Playlist').click()
		//
	cy.url().should('include', '/playlists/new')
		
	cy.get('#playlist_title').type('Cypress Testing')
	cy.get('#playlist_comment').type('Cypress testing comments')
	//cy.contains('Create').click()
	//cy.get('input[name=commit]').last().click()
		cy.get('#playlist_form').submit()
	
	cy.visit('/playlists')
	cy.contains('Cypress Testing')
	cy.contains('Visibility')
	cy.contains('Created')
	cy.contains('Updated')
	cy.contains('Actions')
	cy.contains('Private')
	cy.contains('Size')
	cy.contains('Delete')
	cy.contains('Edit')
	cy.contains('Delete')
	
  })

  //is able to view playlist by clicking on playlist name
  it('.view_playlist()', () => {
		//cy.login('administrator')
			cy.visit('/')
		cy.login('administrator')
			cy.visit('/')
	cy.contains('Playlists').click()
	cy.contains('Create New Playlist').click()
		//
	cy.url().should('include', '/playlists/new')
	cy.get('#playlist_title').type('Cypress Testing2')
	cy.get('#playlist_comment').type('Cypress testing2 comments')
	//cy.contains('Create').click()
			cy.get('#playlist_form').submit()

	cy.visit('/playlists')
	cy.contains('Cypress Testing2').click()
	cy.contains('Edit Playlist')
	cy.contains('Cypress testing2 comments')
	cy.contains('This playlist currently has no playable items')
	
  })

  //deletes playlist permanently from playlists page
  it('.delete_playlist()', () => {
		//cy.login('administrator')
			cy.visit('/')
		cy.login('administrator')
			cy.visit('/')
	cy.contains('Playlists').click()
	cy.contains('Create New Playlist').click()
		//
	cy.url().should('include', '/playlists/new')
	cy.get('#playlist_title').type('Cypress Testing3')
	cy.get('#playlist_comment').type('Cypress testing3 comments')
	//cy.contains('Create').click()
			cy.get('#playlist_form').submit()

	cy.visit('/playlists')
	cy.contains('Delete').click()
	cy.contains('Yes, Delete').click()
	//cy.contains('Playlist was successfully destroyed')
	cy.visit('/playlists')
	cy.contains('Cypress Testing3').should('not.exist')	
  })


  //is able to delete playlist from edit playlist page
  it('.delete_playlist_edit_page()', () => {
		//cy.login('administrator')
			cy.visit('/')
		cy.login('administrator')
			cy.visit('/')
	cy.contains('Playlists').click()
	cy.contains('Create New Playlist').click()
		//
	cy.url().should('include', '/playlists/new')
	cy.get('#playlist_title').type('Cypress Testing4')
	cy.get('#playlist_comment').type('Cypress testing4 comments')
	//cy.contains('Create').click()
			cy.get('#playlist_form').submit()

	cy.visit('/playlists')
	cy.contains('Cypress Testing4').click()
	//cy.contains('Delete')
	cy.contains('Edit Playlist').click()

	cy.contains('Delete Playlist').click()
	cy.contains('Yes, Delete').click()
	cy.contains('Playlist was successfully destroyed.')
	cy.visit('/playlists')
	cy.contains('Cypress Testing4').should('not.exist')
	
  })

  //is able to create public playlist
  it('.create_public_playlist()', () => {
		//cy.login('administrator')
			cy.visit('/')
		cy.login('administrator')
			cy.visit('/')
	cy.contains('Playlists').click()
	cy.contains('Create New Playlist').click()
		//
	cy.url().should('include', '/playlists/new')
	cy.get('#playlist_title').type('Cypress Testing5')
	cy.get('#playlist_comment').type('Cypress testing5 comments')
	cy.contains('Public').click()

	//cy.contains('Create').click()
			cy.get('#playlist_form').submit()

	cy.visit('/playlists')

	cy.contains('Cypress Testing5')
	cy.contains('Public')
	
  })


  //is able to edit playlist name and description
  it('.edit_playlist_name()', () => {
		//cy.login('administrator')
			cy.visit('/')
		cy.login('administrator')
			cy.visit('/')
	cy.contains('Playlists').click()
	cy.contains('Create New Playlist').click()
		//
	cy.url().should('include', '/playlists/new')
	cy.get('#playlist_title').type('Cypress Testing5')
	cy.get('#playlist_comment').type('Cypress testing5 comments')
	cy.contains('Public').click()
	//cy.contains('Create').click()
			cy.get('#playlist_form').submit()


	cy.visit('/playlists')

	cy.contains('Cypress Testing5').click()
	cy.contains('Edit Playlist').click()
	//cy.contains('Edit').click()

	cy.get('#playlist_edit_button').click()
	cy.get('#playlist_title').type('Cypress Testing5 changed')
	cy.get('#playlist_comment').type('Cypress testing5 comments changed')
	cy.contains('Save Changes').click()
	cy.contains('Playlist was successfully updated')
	
  })


  //is able to change public playlist to private
  it('.edit_access_control()', () => {
		//cy.login('administrator')
		cy.login('administrator')
			cy.visit('/')
	cy.contains('Playlists').click()
	cy.contains('Create New Playlist').click()
		//
	cy.url().should('include', '/playlists/new')
	cy.get('#playlist_title').type('Cypress Testing5')
	cy.get('#playlist_comment').type('Cypress testing5 comments')
	cy.contains('Public').click()
	//cy.contains('Create').click()
			cy.get('#playlist_form').submit()


	cy.visit('/playlists')

	cy.contains('Cypress Testing5').click()
	cy.contains('Edit Playlist').click()
	//cy.contains('Edit').click()

	cy.get('#playlist_edit_button').click()
	//cy.get('#playlist_title').type('Cypress Testing5 changed')
	//cy.get('#playlist_comment').type('Cypress testing5 comments changed')
	cy.contains('Private').click()
	cy.contains('Save Changes').click()
	cy.contains('Playlist was successfully updated')
	cy.contains('Private')
	
  })

  })
