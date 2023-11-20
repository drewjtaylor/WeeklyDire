export const validateWriteForm = (values) => {
    const errors = {};

    // Title cannot be blank
    if (!values.title) {
        errors.title = 'You must enter a title'
    } else if (values.title.length > 50) {
        errors.title = 'Your title must be less than 50 characters.'
    };

    // Body cannot be blank
    if (!values.body) {
        errors.body = 'The body of your article cannot be blank.'
    }

    return errors
}