function AppHeader({ inputClass, inputChange, addItem, inputValue, errorMessageClass }) {
    return (
        <div className='header'>
            <h2 className='header__title'>To Do List</h2>
            <form
                className='header__input'
                onSubmit={addItem}
            >
                <input
                    className={inputClass}
                    type='text'
                    placeholder='New Task...'
                    onChange={inputChange}
                    value={inputValue}
                />
                <button
                    className='add-button'
                    type='submit'
                >Add</button>
            </form>
            <span
                className={errorMessageClass}
            >This field is required!</span>
        </div>
    );
}

export default AppHeader;