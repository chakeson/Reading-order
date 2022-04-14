// Common regexes for the application


// Handles the validation of email input. 
// Very basic checks that there is atleast one charcter and then a @ symbol and then one character and one . and then one character.
// This is more a curtesy and to reduce requests to the server, since there is a more complete server side validation of email.
export const emailRegex = /.+@.+\..+/;

// Handles the validation of password input. Checks that there is atleast one uppercase letter, lowercase and on number and one special character.
// Uppercase letter (?=.*[A-Z])
// Lowercase letter (?=.*[a-z])
// Number (?=.*[0-9])
// Special character (?=.*[!"#$%&'()*+,-./:;<=>?@[}\]\^_`{|}~])
// Between 6 and 70 total characters .{6,70}

// eslint-disable-next-line no-useless-escape
export const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!"#$%&'()*+,-./:;<=>?@[}\]\^_`{|}~]).{6,70}$/;