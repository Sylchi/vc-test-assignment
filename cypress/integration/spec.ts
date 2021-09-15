export {}

import faker from 'faker';

const firstName = faker.name.firstName()
const lastName = faker.name.lastName()
const password = faker.internet.password(8);
const email = faker.internet.email();

describe('Homepage redircets to login', () => {
  it(`Loads login page`, () => {
    cy.visit('/')
    cy.location('pathname').should('eq', '/login')
    cy.contains('Sign in to your account')
  })
})

describe('We can register an account', () => {
  it('Loads registration page', () => {
    cy.visit('/register')
    
    cy.contains('Sign up for our amazing service')
  });

  it('Tries to click registration button and fail', () => {
    cy.get('button').click()
    cy.get('input:invalid').should('have.length', 4)
    cy.get('#first-name').then(($input) => {
      //@ts-ignore
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })
  });

  it('Fills the fields', () => {
    cy.get('#first-name').type(firstName);
    cy.get('#last-name').type(lastName);
    cy.get('#email').type(email);
    cy.get('#password').type(faker.internet.password(6));
  });

  it('Submits with too short password and gets error', () => {
    cy.get('button').click()
    cy.get('#password').then(($input) => {
      //@ts-ignore
      expect($input[0].validationMessage).to.eq('Please match the requested format.')
    })
  })

  it('Types a correct password and succeeds', () => { 
    cy.get('#password').focus().clear().type(password)
    cy.intercept('/api/register').as('registerPost')
    cy.get('button').click()
    cy.wait('@registerPost').its('request.url').should('include', 'register')
    cy.location('pathname').should('eq', '/')
    cy.contains(`Hello ${firstName} ${lastName}`)
  })
})

describe('We can sign out', () => {
  it('Clicks the sign out button', () => {
    cy.get('button').click()
    cy.location('pathname').should('eq', '/login')
  })
  it('Redirects us back to login page', () => {
    cy.contains('Sign in to your account')
  })
});

describe('We cannot log in with invalid user', () => {
  it('Fills in random details', () => {
    cy.get('#email').type(faker.internet.email());
    cy.get('#password').type(faker.internet.password(8));
    cy.get('button').click()
    cy.contains('Invalid credentials')
  })
});

describe('We can log in with the user that we created', () => {
  it('Fills the correct details', () => {
    cy.get('#email').focus().clear().type(email);
    cy.get('#password').focus().clear().type(password);
  });

  it('Manages to log in', () => {
    cy.intercept('/api/login').as('loginPost')
    cy.get('button').click()
    cy.wait('@loginPost').its('request.url').should('include', 'login')
    cy.contains(`Hello ${firstName} ${lastName}`)
  })
});