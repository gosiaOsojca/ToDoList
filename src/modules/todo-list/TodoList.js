import ItemsList from '../../ItemsList';

function TodoList({ inputClass, inputChange, addItem, inputValue, errorMessageClass, changeButton, buttonClass, addToStorage, items, removeItem, changeItemStatus }) {
    return (
        <>
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

            <ItemsList
                items={items}
                removeItem={removeItem}
                changeItemStatus={changeItemStatus}
            />

            <div className='footer'>
                <button
                    className={buttonClass}
                    onClick={(e) => { changeButton(e); addToStorage(e) }}
                ></button>
                <span className='footer-span'>Save in local storage</span>
            </div>
        </>
    );
}

export default TodoList;