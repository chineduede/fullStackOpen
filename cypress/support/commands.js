// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('login', ({ username, password }) => {
	cy.request('POST', 'http://localhost:8000/api/login', {
		username, password
	})
		.then(({ body }) => {
			localStorage.setItem('blogApp', JSON.stringify(body))
			console.log(body);
		})
		cy.visit('http://localhost:3002')
})

Cypress.Commands.add('createBlog', (blogObj) => {
	cy.window()
		.then(win => {
			console.log(localStorage.getItem('blogApp'));
			cy.request({
				url: 'http://localhost:8000/api/blogs',
				method: 'POST',
				body: blogObj,
				headers: {
					Authorization: `bearer ${JSON.parse(win.localStorage.getItem('blogApp')).token}`
				}
			})		
		})
	cy.visit('http://localhost:3000')
})