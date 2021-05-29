import FormButton from '../FormButton';
import { useHistory } from "react-router-dom";

function SignUpConfirmation() {
    let history = useHistory();

    function handleClick() {
        history.push('/SignIn');
    }

    return (
        <>
            <div className='header'>
                <h2 className='header__title'>Congratulations!</h2>
            </div>
            <div class='sign-up-confirmation'>
                <span className='sign-up-confirmation--span'>Your account has been successfully created.<br></br> Please continue to Log In.</span>
                <FormButton
                    className='form-button'
                    name='Continue'
                    onClick={handleClick}
                />
            </div>
        </>
    );
}

export default SignUpConfirmation;