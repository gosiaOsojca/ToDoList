function AppFooter({ changeButton, buttonClass, addToStorage}) {
    return (
        <div className='footer'>
            <button
                className={buttonClass}
                id='saveButton'
                onClick={(e) => {changeButton(e); addToStorage(e)}}
            ></button>
            <span className='footer-span'>Save in local storage</span>
        </div>
    );
}

export default AppFooter;