export const validateRegisterForm = (values) => {
    const errors = {};

    const validateEmail = (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    };

    const validateComplexPassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password)
    };

    // Email is required
    if (!values.email) {
        errors.email = 'An email address is required'
    } else if (!validateEmail(values.email)) {
        errors.email = 'You must enter a valid email address.'
    };

    // Username must be between 6 and 16 characters
    if (!values.username) {
        errors.username = 'You must enter a username.'
    } else if (values.username.length < 6 || values.username.length > 16) {
        errors.username = 'Your username must be between 6 and 16 characters.'
    };

    // Password requirements
    if (!values.password) {
        errors.password = 'You must enter a password.'
    } else if (values.password.length < 6) {
        errors.password = 'Your username must be at least 6 characters.'
    } else if (values.password.length > 100) {
        errors.password = 'Will you really remember that?!'
    } else if (!validateComplexPassword(values.password)) {
        errors.password = 'Password not complex enough--see rules below.'
    };

    // Password must match 2nd password
    if (values.passwordAgain !== values.password) {
        errors.passwordAgain = 'Passwords do not match.'
    };

    return errors
}