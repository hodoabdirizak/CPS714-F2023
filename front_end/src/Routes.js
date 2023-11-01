import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { BackEndTesting } from './pages/BackEndTesting';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/signup">
                    <SignUpPage/>
                </Route>
                <Route path="/backend-testing">
                    <BackEndTesting/>
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes;