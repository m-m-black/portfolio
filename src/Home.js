import React from 'react';
import SketchPreview from './SketchPreview';
import circles from './images/circles.png';
import shapes from './images/shapes.png';
import gridseq from './images/gridseq.png';

class Home extends React.Component {
	render() {
		return (
			<div className="content">
				<SketchPreview 
					url="https://m-m-black.github.io/circles/"
					title="Circles"
					description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
					image={circles}
					alignment="left"
				/>
				<SketchPreview 
					url="https://m-m-black.github.io/shapes/"
					title="Shapes"
					description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
					image={shapes}
					alignment="right"
				/>
				<SketchPreview 
					url="https://m-m-black.github.io/gridseq/"
					title="GridSeq"
					description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
					image={gridseq}
					alignment="left"
				/>
			</div>
		);
	}
}

export default Home;
