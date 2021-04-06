import { Component } from 'react';
import AppHeader from './AppHeader';
import ItemsList from './ItemsList';
import AppFooter from './AppFooter';

class App extends Component {
    constructor() {
        super()
        this.state = {
            newToDoItem: '',
            toDoItems: [],
            persistData: false,
            incorrectEntry: false
        };
        this.localStorageItems = 'items';
    }



    componentDidMount() {
        const storageItems = localStorage.getItem(this.localStorageItems);
        let parsedItems;
        if (storageItems) {
            try {
                parsedItems = JSON.parse(storageItems);
            } catch (e) {
                alert(e);
            }
        }
        if (parsedItems) {
            const items = parsedItems.reduce((arrayItems, item) => {
                arrayItems.push({
                    value: item.value,
                    isChecked: item.isChecked
                });
                return arrayItems;
            }, []);

            this.setState({ toDoItems: items });
        }
    }

    componentDidUpdate() {
        if (this.state.persistData) {
            this.saveToLocalStorage();
        }
    }

    onInputChange = event => {
        this.setState({ newToDoItem: event.target.value })
    }

    onAddButtonClick = (e) => {
        e.preventDefault();
        if (this.state.newToDoItem) {
            this.setState({
                toDoItems: this.state.toDoItems.concat({
                    value: this.state.newToDoItem,
                    isChecked: false
                }), newToDoItem: '', incorrectEntry: false
            })
        } else {
            this.setState({ incorrectEntry: true });
        }
    }

    onDeleteButtonClick = item => {
        this.setState({
            toDoItems: this.state.toDoItems.filter(function (singleItem) {
                if (singleItem.value !== item.value) {
                    return singleItem;
                }
            })
        });
    }

    saveButtonToggleClass = () => {
        const currentState = this.state.persistData;
        this.setState({ persistData: !currentState });
    }

    itemToggleClass = item => {
        const items = this.state.toDoItems.map((input) => {
            return item === input ? { ...item, isChecked: !item.isChecked } : input;
        })

        this.setState({ toDoItems: items });
    }

    saveToLocalStorage = () => {
        try {
            localStorage.setItem(this.localStorageItems, JSON.stringify(this.state.toDoItems));
        } catch (e) {
            alert(e);
        }
    }

    removeFromLocalStorage = () => {
        localStorage.removeItem(this.localStorageItems);
    }

    render() {
        return (
            <div className='container'>
                <AppHeader inputClass={this.state.incorrectEntry ? 'input input--incorrect' : 'input'} inputChange={this.onInputChange} addItem={this.onAddButtonClick} inputValue={this.state.newToDoItem} errorMessageClass={this.state.incorrectEntry ? 'error-message error-message--visible' : 'error-message'}/>
                <ItemsList items={this.state.toDoItems} removeItem={this.onDeleteButtonClick} changeItemStatus={this.itemToggleClass} />
                <AppFooter buttonClass={this.state.persistData ? 'save-button save-button--clicked' : 'save-button'} changeButton={this.saveButtonToggleClass} addToStorage={this.state.persistData ? this.removeFromLocalStorage : this.saveToLocalStorage} />
            </div>
        );
    }
}

export default App;