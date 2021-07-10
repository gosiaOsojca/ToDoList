import { useHistory } from "react-router-dom";

function SignUpConfirmation() {
    let history = useHistory();

    function handleClick() {
        history.push('/SignIn');
    }

    return (
        <>
            <div className='header'>
                <h2 data-testid='congr' className='header__title'>Congratulations!</h2>
            </div>
            <div class='sign-up-confirmation'>
                <div class='sign-up-confirmation--text'>
                    <p className='sign-up-confirmation--span'>Your account has been successfully created.</p>
                    <p className='sign-up-confirmation--span'>Please continue to Log In.</p>
                </div>
                <button
                    className='form-button'
                    type='submit'
                    onClick={handleClick}
                >
                    Continue
                </button>
            </div>
        </>
    );
}

export default SignUpConfirmation;