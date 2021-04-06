function AppFooter({ changeButton, buttonClass, addToStorage}) {
    return (
        <div className='footer'>
            <button
                className={buttonClass}
                onClick={(e) => {changeButton(e); addToStorage(e)}}
            ></button>
            <span className='footer-span'>Save in local storage</span>
        </div>
    );
}

export default AppFooter;