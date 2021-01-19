import React from 'react';
import AboutFragment from './AboutFragment';

class About extends React.Component {
	render() {
		return (
			<div className="content">
				<AboutFragment 
					text="Hi, I’m Morgan. I’m a software developer and creative coder based in Melbourne, Australia." 
					alignment="left" 
				/>
				<AboutFragment 
					text="I built this site with React.js. The musical sketches featured were created with p5.js." 
					alignment="right" 
				/>
				<AboutFragment 
					text="My current interests and projects include algorithmic music composition, experimental musical instrument interface design, and web design/development." 
					alignment="left" 
				/>
				<AboutFragment 
					text="I’m proficient in Java, JavaScript, C#, HTML, CSS, SQL, React.js, p5.js and Processing. I'm currently learning Haskell and Rust." 
					alignment="right" 
				/>
			</div>
		);
	}
}

export default About;
