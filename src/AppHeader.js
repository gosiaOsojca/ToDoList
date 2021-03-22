function AppHeader({ inputChange, addItem, inputValue }) {
    return (
        <div className='header'>
            <h2 className='header__title'>To Do List</h2>
            <div className='header__input'>
                <input
                    className='input'
                    type='text'
                    id='input'
                    placeholder='New Task...'
                    onChange={inputChange}
                    value={inputValue}
                />
                <span
                    className='add-button'
                    id='addButton'
                    onClick={addItem}
                >Add</span>
            </div>
        </div>
    );
}

export default AppHeader;