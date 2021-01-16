import React from 'react';

const AboutFragment = ({text, alignment}) => {
	if (alignment === "left") {
		return (
			<div className="about-fragment">
				<div className="about-left">
					<p>
						{text}						
					</p>
				</div>
			</div>
		);
	} else if (alignment === "right") {
		return (
			<div className="about-fragment">
				<div className="about-right">
					<p>
						{text}
					</p>
				</div>
			</div>
		);
	}
}

export default AboutFragment;
