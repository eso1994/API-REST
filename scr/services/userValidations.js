import { emailValidation } from './validations.js';
import { passwordValidation } from './validations.js'

function userValidation(res, email, password, confirmPassword) {

    if (!email)
        return res.status(422).json({ msg: 'E-mail is required!', valid: false });


    if (!emailValidation(email))
        return res.status(422).json({ msg: 'Invalid email. Please enter a valid email.', valid: false });

    if (!password)
        return res.status(422).json({ msg: 'Password is required!', valid: false });


    if (!passwordValidation(password))
        return res.status(422).json({ msg: 'The password must contain at least 8 characters containing at least one capital letter, one number and one special character', valid: false });


    if (password !== confirmPassword)
        return res.status(422).json({ msg: "Passwords don't match", valid: false });

    return { valid: true }
}

export default userValidation;