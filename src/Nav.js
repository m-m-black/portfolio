import React from 'react';
import {Link} from 'react-router-dom';

class Nav extends React.Component {
	render() {
		return (
			<nav>
				<Link to="/">
					<h3 className='nav-header'>
						Morgan Black
					</h3>
				</Link>
				<ul className='nav-links'>
					<Link to="/about">
						<li>About</li>
					</Link>
					<Link to="/">
						<li>Home</li>
					</Link>
				</ul>
			</nav>
		);
	}
}

export default Nav;
