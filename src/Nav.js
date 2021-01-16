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
					<a
						href="https://github.com/m-m-black"
						target="_black"
						rel="noreferrer"
					>
						<li>GitHub</li>
					</a>
					<a
						href="https://www.linkedin.com/in/morgan-black-132b145a/"
						target="_black"
						rel="noreferrer"
					>
						<li>LinkedIn</li>
					</a>
				</ul>
			</nav>
		);
	}
}

export default Nav;
