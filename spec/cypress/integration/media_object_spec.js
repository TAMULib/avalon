context('checks navigation after logging in', () => {
  beforeEach(() => {
    //cy.visit('https://demo.avalonmediasystem.org')
	cy.visit('https://spruce.dlib.indiana.edu')
  })

  //can visit a media object
  it('.visit_media_object() - click on a DOM element', () => {
	cy.visit('https://spruce.dlib.indiana.edu/media_objects/sj1392079')
	cy.contains('Unknown item').should('not.exist')
	cy.get('#mep_0').click()
  })

  //displays the title properly
  it('.validate_media_object() - click on a DOM element', () => {
	cy.visit('https://spruce.dlib.indiana.edu/media_objects/sj1392079')
	let title = 'Beginning Responsibility: Lunchroom Manners'
	cy.contains(title)
  })

  //displays the main contributors properly
  it('.validate_main_contributor() - click on a DOM element', () => {
	cy.visit('https://spruce.dlib.indiana.edu/media_objects/sj1392079')
	cy.contains('Main contributor')
  })

  //displays the summary properly
  it('.validate_summary() - click on a DOM element', () => {
	cy.visit('https://spruce.dlib.indiana.edu/media_objects/sj1392079')
	let summary = 'The rude, clumsy puppet Mr. Bungle shows kids how to behave in the school cafeteria - the assumption being that kids actually want to behave during lunch. This film has a cult following since it appeared on a Pee Wee Herman HBO special.'
	cy.contains('Summary')
	cy.contains(summary)
  })

  //Open multiple media objects in different tabs and play it.
  it('.play_media_objects() - click on a DOM element', () => {
	cy.get('a[href*="catalog"] ').first().click()	
	//cy.get(' a[href*="/media_objects/"] ').first().click()
	cy.get('a[href*="media_objects').then((media_objects) => {
		function printObject(o) {
		  var out = '';
		  for (var p in o) {
			out += p + ': ' + o[p] + '\n';
		  }
		  alert(out);
		}
		var i;
		for (i = 0; i < 3; i += 2) {
			//media_objects[i].click()
			//cy.get('div').should('have.class', 'mejs__overlay-play').first().click()
			window.open(media_objects[i])
			//alert(String(media_objects[i]))
			cy.visit(String(media_objects[i]))
			//cy.window().its('open').should('be.called')
			cy.window().get('div').should('have.class', 'mejs__overlay-play').first().click()
			
		}
	})
  })
})