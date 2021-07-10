import TodoList from './modules/todo-list/TodoList';
import SignUp from './modules/SignUp';
import SignIn from './modules/SignIn';
import SignUpConfirmation from './modules/SignUpConfirmation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
    return (
        <Router>
            <div className='container'>
                <Switch>
                    <Route exact path='/'>
                        <SignUp />
                    </Route>
                    <Route path='/signupconfirmation'>
                        <SignUpConfirmation />
                    </Route>
                    <Route path='/signin'>
                        <SignIn />
                    </Route>
                    <Route path='/todolist'>
                        <TodoList />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;