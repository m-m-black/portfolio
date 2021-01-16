import React from 'react';
import {Link} from 'react-router-dom';

const SketchPreview = ({url, title, description, image, alignment}) => {
	if (alignment === "left") {
		return (
			<div className="sketch-preview">
				<div className="sketch-img">
					<a
						href={url}
						target="_blank"
						rel="noreferrer"
					>
						<img src={image} alt="glitch" width="300" />
					</a>
				</div>
				<div className="sketch-text left">
					<h3>
						<a 
							href={url}
							target="_blank"
							rel="noreferrer"
						>
							{title}
						</a>
					</h3>
					<div className="sketch-desc left">
						{description}
					</div>
				</div>
			</div>
		);
	} else if (alignment === "right") {
		return (
			<div className="sketch-preview">
				<div className="sketch-text right">
					<h3>
						<a
							href={url}
							target="_blank"
							rel="noreferrer"
						>
							{title}
						</a>
					</h3>
					<div className="sketch-desc right">
						{description}
					</div>
				</div>
				<div className="sketch-img">
					<a
						href={url}
						target="_blank"
						rel="noreferrer"
					>
						<img src={image} alt="glitch" width="300" />
					</a>
				</div>
			</div>
		);
	}
}

export default SketchPreview;
