import TodoList from './modules/todo-list/TodoList';
import SignUp from './modules/SignUp';
import SignIn from './modules/SignIn';
import SignUpConfirmation from './modules/SignUpConfirmation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';


function App() {
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
        <Router>
            <div className='container'>
                <Switch>
                    <Route exact path='/'>
                        <SignUp />
                    </Route>
                    <Route path='/SignUpConfirmation'>
                        <SignUpConfirmation />
                    </Route>
                    <Route path='/SignIn'>
                        <SignIn />
                    </Route>
                    <Route path='/ToDoList'>
                        <TodoList
                            inputClass={incorrectEntry ? 'input input--incorrect' : 'input'}
                            inputChange={onInputChange}
                            addItem={onAddButtonClick}
                            inputValue={newToDoItem}
                            errorMessageClass={incorrectEntry ? 'error-message error-message--visible' : 'error-message'}
                            items={toDoItems}
                            removeItem={onDeleteButtonClick}
                            changeItemStatus={itemToggleClass}
                            buttonClass={persistData ? 'save-button save-button--clicked' : 'save-button'}
                            changeButton={saveButtonToggleClass}
                            addToStorage={persistData ? removeFromLocalStorage : saveToLocalStorage}
                        />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;