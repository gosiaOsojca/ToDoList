import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";


function SignIn() {
    const signInSchema = Yup.object().shape({
        email: Yup.string().email()
            .required('Email is required')
            .max(255, 'Email too long'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password too short')
            .max(255, 'Password too long'),
    });

    const initialValues = {
        email: '',
        password: '',
    };


    let history = useHistory();

    const submitForm = (values, formikBag) => {
        const jsonData = {
            email: values.email,
            password: values.password
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData)
        };

        fetch('http://localhost:8888/v1/user/sign-in', requestOptions)
            .then(response => {
                if (response.status == 201) {
                    history.push('/ToDoList');
                } else if (response.status == 404) {
                    formikBag.setFieldError('email', 'The user with such email does not exist');
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
                            <h2 className='header__title'>Sign In</h2>
                        </div>
                        <Form
                            className='form'
                        >
                            <Field
                                className={errors.email && touched.email ?
                                    'form__input form__input--error' : 'form__input'}
                                type='email'
                                placeholder='Email'
                                name='email'
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
                            />
                            <ErrorMessage
                                name="password"
                                component="span"
                                className="error"
                            />

                            <button
                                className={!(dirty && isValid) ? 'form-button form-button--disabled' : 'form-button'}
                                disabled={!(dirty && isValid)}
                                type="submit"
                            >
                                Sign In
                            </button>
                        </Form>
                    </>
                );
            }}
        </Formik>
    );
}

export default SignIn;