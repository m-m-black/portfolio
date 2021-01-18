import React from 'react';
import {Link} from 'react-router-dom';

class Nav extends React.Component {
	state = {
		burger: null,
		nav: null
	}

	constructor(props) {
		super(props);
		this.navSlide = this.navSlide.bind(this);
		this.homeSlide = this.homeSlide.bind(this);
	}

	componentDidMount() {
		this.setState({
			burger: document.querySelector('.burger'),
			nav: document.querySelector('.nav-links')
		});
	}

	navSlide() {
		// Navbar show/hide
		this.state.nav.classList.toggle('nav-active');
		// Burger menu animation
		this.state.burger.classList.toggle('toggle');
	}

	homeSlide() {
		if (this.state.nav.classList.contains('nav-active')) {
			this.navSlide();
		}
	}

	render() {
		return (
			<nav>
				<Link to="/">
					<h3 className='nav-header' onClick={this.homeSlide}>
						Morgan Black
					</h3>
				</Link>
				<ul className='nav-links'>
					<Link to="/about" onClick={this.navSlide}>
						<li>About</li>
					</Link>
					<Link to="/" onClick={this.navSlide}>
						<li>Home</li>
					</Link>
					<a
						href="https://github.com/m-m-black"
						target="_black"
						rel="noreferrer"
						onClick={this.navSlide}
					>
						<li>GitHub</li>
					</a>
					<a
						href="https://www.linkedin.com/in/morgan-black-132b145a/"
						target="_black"
						rel="noreferrer"
						onClick={this.navSlide}
					>
						<li>LinkedIn</li>
					</a>
				</ul>
				<div className='burger' onClick={this.navSlide}>
					<div className='line1'></div>
					<div className='line2'></div>
					<div className='line3'></div>
				</div>
			</nav>
		);
	}
}

export default Nav;
