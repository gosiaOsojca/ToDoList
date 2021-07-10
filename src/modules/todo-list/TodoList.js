import ItemsList from '../../ItemsList';
import { useState, useEffect } from 'react';

function TodoList() {
    const [newToDoItem, setNewToDoItem] = useState('');
    const [toDoItems, setToDoItems] = useState([]);
    const [persistData, setPersistData] = useState(false);
    const [incorrectEntry, setIncorrectEntry] = useState(false);
    const [localStorageItems] = useState('items');

    const onInputChange = event => {
        setNewToDoItem(event.target.value)
    };

    const onAddButtonClick = (e) => {
        e.preventDefault();
        if (newToDoItem) {
            setToDoItems(toDoItems.concat({
                value: newToDoItem,
                isChecked: false
            }));
            setNewToDoItem('');
            setIncorrectEntry(false);
        } else {
            setIncorrectEntry(true);
        }
    };

    useEffect(() => {
        const storageItems = localStorage.getItem(localStorageItems);
        let parsedItems;
        if (storageItems) {
            try {
                parsedItems = JSON.parse(storageItems);
            } catch (e) {
                alert(e);
            }
        }
        if (parsedItems) {
            const items = parsedItems.map((item) => {
                return {
                    value: item.value,
                    isChecked: item.isChecked
                }
            });

            setToDoItems(items);
        }
        if (persistData) {
            saveToLocalStorage();
        }
    }, [])

    const onDeleteButtonClick = item => {
        setToDoItems(toDoItems.filter(function (singleItem) {
            if (singleItem.value !== item.value) {
                return singleItem;
            }
        })
        );
    };

    const saveButtonToggleClass = () => {
        const currentState = persistData;
        setPersistData(!currentState);
    };

    const itemToggleClass = item => {
        const items = toDoItems.map((input) => {
            return item === input ? { ...item, isChecked: !item.isChecked } : input;
        })

        setToDoItems(items);
    };

    const saveToLocalStorage = () => {
        try {
            localStorage.setItem(localStorageItems, JSON.stringify(toDoItems));
        } catch (e) {
            alert(e);
        }
    };

    const removeFromLocalStorage = () => {
        localStorage.removeItem(localStorageItems);
    };


    return (
        <>
            <div className='header'>
                <h2 className='header__title'>To Do List</h2>
                <form
                    className='header__input'
                    onSubmit={onAddButtonClick}
                >
                    <input
                        className={incorrectEntry ? 'input input--incorrect' : 'input'}
                        type='text'
                        placeholder='New Task...'
                        onChange={onInputChange}
                        value={newToDoItem}
                    />
                    <button
                        className='add-button'
                        type='submit'
                    >Add</button>
                </form>
                <span
                    className={incorrectEntry ? 'error-message error-message--visible' : 'error-message'}
                >This field is required!</span>
            </div>

            <ItemsList
                items={toDoItems}
                removeItem={onDeleteButtonClick}
                changeItemStatus={itemToggleClass}
            />

            <div className='footer'>
                <button
                    className={persistData ? 'save-button save-button--clicked' : 'save-button'}
                    onClick={() => { saveButtonToggleClass(); persistData ? removeFromLocalStorage() : saveToLocalStorage() }}
                ></button>
                <span className='footer-span'>Save in local storage</span>
            </div>
        </>
    );
}

export default TodoList;