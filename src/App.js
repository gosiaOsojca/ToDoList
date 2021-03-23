import { Component } from 'react';
import AppHeader from './AppHeader';
import ItemsList from './ItemsList';
import AppFooter from './AppFooter';

class App extends Component {
    constructor() {
        super()
        this.state = {
            inputfield: '',
            inputs: [],
            saveButtonClassActive: false
        };
    }

    componentDidMount() {
        const storageItems = localStorage.getItem('items');
        const parsedItems = JSON.parse(storageItems);
        if (parsedItems) {
            const items = [];
            for (const item of parsedItems) {
                const input = {
                    value: item.value,
                    isChecked: item.isChecked
                };
                items.push(input);
            }
            this.setState({ inputs: items });
        }
    }

    onInputChange = event => {
        this.setState({ inputfield: event.target.value })
    }

    onAddButtonClick = () => {
        if (this.state.inputfield) {
            this.setState(state => {
                const item = {
                    value: state.inputfield,
                    isChecked: false
                };
                const inputs = state.inputs.concat(item);
                return {
                    inputs,
                    inputfield: '',
                };
            }, () => {
                if (this.state.saveButtonClassActive) {
                    this.saveToLocalStorage();
                }
            })
        } else {
            alert("Fill the field");
        }

    }

    onDeleteButtonClick = event => {
        this.setState({
            inputs: this.state.inputs.filter(function (item) {
                if (item.value !== event.target.previousSibling.textContent) {
                    return item;
                }
            })
        }, () => {
            if (this.state.saveButtonClassActive) {
                this.saveToLocalStorage();
            }
        });
    }

    saveButtonToggleClass = () => {
        const currentState = this.state.saveButtonClassActive;
        this.setState({ saveButtonClassActive: !currentState });
    }

    itemToggleClass = item => {
        const items = this.state.inputs.map((input) => {
            return item === input ? { ...item, isChecked: !item.isChecked } : input;
        })

        this.setState({ inputs: items });
    }

    saveToLocalStorage = () => {
        localStorage.setItem('items', JSON.stringify(this.state.inputs));
    }

    removeFromLocalStorage = () => {
        localStorage.removeItem('items');
    }

    render() {
        const saveButtonClassActive = this.state.saveButtonClassActive;
        if (saveButtonClassActive) {

        }
        return (
            <div className='container'>
                <AppHeader inputChange={this.onInputChange} addItem={this.onAddButtonClick} inputValue={this.state.inputfield} />
                <ItemsList items={this.state.inputs} removeItem={this.onDeleteButtonClick} changeItemStatus={this.itemToggleClass} />
                <AppFooter buttonClass={this.state.saveButtonClassActive ? 'save-button save-button--clicked' : 'save-button'} changeButton={this.saveButtonToggleClass} addToStorage={this.state.saveButtonClassActive ? this.removeFromLocalStorage : this.saveToLocalStorage} />
            </div>
        );
    }
}

export default App;