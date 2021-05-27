import { Formik } from "formik";
import { useHistory } from "react-router-dom";


function SignUp() {
    const initialValues = {
        name: '',
        email: '',
        password: '',
    };

    let validate = (values) => {
        let errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.userName) {
            errors.userName = 'Name is required';
        } else if (values.userName.length > 255) {
            errors.userName = 'Name too long';
        }
        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!regex.test(values.email)) {
            errors.email = 'Invalid Email';
        } else if (values.email.length > 255) {
            errors.email = 'Email too long';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 8) {
            errors.password = 'Password too short';
        } else if (values.password.length > 255) {
            errors.password = 'Password too long';
        }
        return errors;
    };

    let history = useHistory();

    const submitForm = (values, formikBag) => {
        const jsonData = {
            name: values.userName,
            email: values.email,
            password: values.password
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData)
        };

        fetch('http://localhost:8888/v1/user/sign-up', requestOptions)
            .then(response => {
                if (response.status == 201) {
                    history.push('/ToDoList');
                } else if (response.status == 409) {
                    formikBag.setFieldError('email', 'The user with such email already signed up.');
                }
            })
    };

    return (
        <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={submitForm}
        >
            {(formik) => {
                const {
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched,
                    handleBlur,
                    isValid,
                    dirty
                } = formik;
                return (
                    <>
                        <div className='header'>
                            <h2 className='header__title'>Sign Up</h2>
                        </div>
                        <form
                            className='form'
                            onSubmit={handleSubmit}
                        >
                            <input
                                className={errors.userName && touched.userName ?
                                    'form__input form__input--error' : 'form__input'}
                                type='text'
                                placeholder='Name'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name='userName'
                                value={values.userName}
                            />
                            {errors.userName && touched.userName && (
                                <span className='error'>{errors.userName}</span>
                            )}
                            <input
                                className={errors.email && touched.email ?
                                    'form__input form__input--error' : 'form__input'}
                                type='email'
                                placeholder='Email'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name='email'
                                value={values.email}
                            />
                            {errors.email && touched.email && (
                                <span className='error'>{errors.email}</span>
                            )}
                            <input
                                className={errors.password && touched.password ?
                                    'form__input form__input--error' : 'form__input'}
                                type='password'
                                placeholder='Password'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name='password'
                                value={values.password}
                            />
                            {errors.password && touched.password && (
                                <span className='error'>{errors.password}</span>
                            )}
                            <button
                                className={dirty && isValid ? 'form-button' : 'form-button form-button--disabled'}
                                disabled={!(dirty && isValid)}
                                type='submit'
                            >Sign up</button>
                        </form>
                        <div className='form-footer'>
                            <span className='form-footer--span'>Already have an account?</span>
                            <span className='form-footer--login'>Log In</span>
                        </div>
                    </>
                );
            }}
        </Formik>
    );
}

export default SignUp;