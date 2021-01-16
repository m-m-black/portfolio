import React from 'react';
import Nav from './Nav';
import Home from './Home';
import About from './About';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends React.Component {
	render() {
		return (
				<Router basename="/portfolio/">
					<Nav />
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/about" component={About} />
						</Switch>
				</Router>
		);
	}
}

export default App;
