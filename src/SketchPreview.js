import React from 'react';

const SketchPreview = ({url, title, description, image, altText, alignment}) => {
	if (alignment === "left") {
		return (
			<div className="sketch-preview">
				<div className="sketch-img">
					<a
						href={url}
						target="_blank"
						rel="noreferrer"
					>
						<img src={image} alt={altText} width="300" />
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
						<p>{description}</p>
					</div>
				</div>
			</div>
		);
	} else if (alignment === "right") {
		return (
			<div className="sketch-preview sketch-preview-right">
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
						<p>{description}</p>
					</div>
				</div>
				<div className="sketch-img">
					<a
						href={url}
						target="_blank"
						rel="noreferrer"
					>
						<img src={image} alt={altText} width="300" />
					</a>
				</div>
			</div>
		);
	}
}

export default SketchPreview;
