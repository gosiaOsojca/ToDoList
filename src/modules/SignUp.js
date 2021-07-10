import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";


function SignUp() {
    const signInSchema = Yup.object().shape({
        userName: Yup.string()
            .required('Name is required')
            .max(255, 'Name too long'),
        email: Yup.string().email()
            .required('Email is required')
            .max(255, 'Email too long'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password too short')
            .max(255, 'Password too long'),
    });

    const initialValues = {
        name: '',
        email: '',
        password: '',
    };

    let history = useHistory();

    function handleLogInClick() {
        history.push('/SignIn');
    }

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
                    history.push('/SignUpConfirmation');
                } else if (response.status == 409) {
                    formikBag.setFieldError('email', 'The user with such email already signed up.');
                }
            })
            .catch(err => alert(err))
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={signInSchema}
            onSubmit={submitForm}
        >
            {(formik) => {
                const { errors, touched, isValid, dirty } = formik;
                return (
                    <>
                        <div className='header'>
                            <h2 className='header__title'>Sign Up</h2>
                        </div>
                        <Form
                            className='form'
                        >
                            <Field
                                className={errors.userName && touched.userName ?
                                    'form__input form__input--error' : 'form__input'}
                                type='text'
                                placeholder='Name'
                                name='userName'
                                data-testid='userName'
                            />
                            <ErrorMessage
                                name="userName"
                                component="span"
                                className="error"
                            />

                            <Field
                                className={errors.email && touched.email ?
                                    'form__input form__input--error' : 'form__input'}
                                type='email'
                                placeholder='Email'
                                name='email'
                                data-testid='email'
                            />
                            <ErrorMessage
                                name="email"
                                component="span"
                                className="error"
                            />

                            <Field
                                className={errors.password && touched.password ?
                                    'form__input form__input--error' : 'form__input'}
                                type='password'
                                placeholder='Password'
                                name='password'
                                data-testid='password'
                            />
                            <ErrorMessage
                                name="password"
                                component="span"
                                className="error"
                            />

                            <button
                                // className={!(dirty && isValid) ? 'form-button form-button--disabled' : 'form-button'}
                                className='form-button'
                                // disabled={!(dirty && isValid)}
                                type="submit"
                            >
                                Sign Up
                            </button>
                        </Form>
                        <div className='form-footer'>
                            <span className='form-footer--span'>Already have an account?</span>
                            <span className='form-footer--login' onClick={handleLogInClick}>Log In</span>
                        </div>
                    </>
                );
            }}
        </Formik>
    );
}

export default SignUp;