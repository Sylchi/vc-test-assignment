import { validateSingle, validateMany } from './validate'

test('First name validates', () => {
  expect(validateSingle('firstName', 'Ken').isValid).toBe(true);
});

test('Empty first name does not validate', () => {
  expect(validateSingle('firstName', null).isValid).toBe(false);
});

test('Name with numbers does not validate', () => {
  expect(validateSingle('firstName', '12345').isValid).toBe(false);
});

test('First name does not validate because its too long', () => {
  expect(validateSingle('firstName', 'Kennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn').isValid).toBe(false);
});

test('Last name validates', () => {
  expect(validateSingle('lastName', 'Kauksi').isValid).toBe(true);
});

test('Last name does not validate because its too long', () => {
  expect(validateSingle('lastName', 'Kauksiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii').isValid).toBe(false);
});

test('Email validates', () => {
  expect(validateSingle('email', 'kensservices@gmail.com').isValid).toBe(true);
});

test('Email does not validate because it is not correct', () => {
  expect(validateSingle('lastName', 'ken..kauksi@gmail.com').isValid).toBe(false);
});

test('Password validates', () => {
  expect(validateSingle('password', 'secretPassword').isValid).toBe(true);
});

test('Passowrd does not validate because its too short', () => {
  expect(validateSingle('password', '12345').isValid).toBe(false);
});

test('Correct user data validates', () => {
  expect(validateMany({
    firstName: 'Ken',
    lastName: 'Kauksi',
    email: 'kensservices@gmail.com',
    password: '12345678'
  }).isValid).toBe(true);
});

test('Incorrect user data does not validate', () => {
  //@ts-expect-error
  expect(validateMany({
    firstName: 'Ken',
    lastName: 'Kauksi',
    email: 'kensservices@gmail.com'
  }).isValid).toBe(false);
});