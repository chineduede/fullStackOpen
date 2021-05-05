
describe('Blog App', function() {

	beforeEach(function() {
		cy.request('POST', 'http://localhost:8000/api/testing/reset')
		const user = {
			username: 'chndvz',
			name: 'chinedu',
			password: 'test123'
		}
		cy.request('POST', 'http://localhost:8000/api/users', user)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function () {
		cy.contains('Log in to application')
		cy.contains('login')
	})

	describe('login', function() {
		it('succeeds with correct credentials', function() {
			cy.get('#username').type('chndvz')
			cy.get('#password').type('test123')
			cy.get('#loginButton').click()

			cy.get('.success').should('contain', 'Welcome back chndvz')
			cy.get('input').should('not.contain', '#password')
		})

		it('fails with the wrong credentials', function() {
			cy.get('#username').type('wronguser')
			cy.get('#password').type('wrong')
			cy.get('#loginButton').click()

			cy.get('.error')
				.should('contain', 'Wrong credentials')
				.should('have.css', 'color', 'rgb(255, 0, 0)')
			cy.get('html').should('not.contain', 'chndvz logged in')
		})
	})

	describe('When logged in', function() {
		beforeEach(function() {
			cy.get('#username').type('chndvz')
			cy.get('#password').type('test123')
			cy.get('#loginButton').click()
		})

		it('A blog can be created', function () {
			cy.get('.toggable-div').find('button').click()
			cy.get('#author').type('chndvz')
			cy.get('#url').type('www.testing12.com')
			cy.get('#title').type('Testing 12')
			cy.get('#newBlog').click()

			cy.get('.blogOrdinary')
				.contains('Testing 12')
				.find('button').click()
			cy.get('.blogDetails')
				.contains('www.testing12.com')
		})
	})

	describe('A user can affect a blog', function() {
		beforeEach(function() {
			const blog = {
				title: 'The mystery of John Morriati',
				url: 'www.johnmystries.com',
				author:'chndvz'
			}
			cy.get('#username').type('chndvz')
			cy.get('#password').type('test123')
			cy.get('#loginButton').click()			
			cy.createBlog(blog)
		})
		
		it.only('A user can like a blog', function () {
			cy.contains('The mystery of John Morriati').parent().find('button').as('likeButton')
			cy.get('@likeButton').click()
			cy.get('.likesPara').should('contain', 'likes 1')
		})

		it('A user that created a blog can delete it', function() {
			cy.contains('The mystery of John Morriati').parent().get('#delBlog').as('delButton')
			cy.get('@delBlog').click()

			cy.should('not.contain', 'The mystery of John Morriati')

		})
	})

	
})