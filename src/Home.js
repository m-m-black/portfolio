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
					description="Circles pulsate to create a musical meditation. The larger the circle, the slower the pulsation. Pitch is determined by the position of the circle. Inspired by the phase-based compositions of Steve Reich."
					image={circles}
					alignment="left"
				/>
				<SketchPreview 
					url="https://m-m-black.github.io/shapes/"
					title="Shapes"
					description="Draw a shape to build a melody. Draw multiple shapes to create a forest of sound. Listen as the melodies interact, weaving through each other in surprising ways. Inspired by the music of Laurie Spiegel."
					image={shapes}
					alignment="right"
				/>
				<SketchPreview 
					url="https://m-m-black.github.io/gridseq/"
					title="GridSeq"
					description="A musical sequencer that operates in 2 dimensions. Rhythms propagate outwards (up, down, left, right) from active cells. Sounds are triggered from the intersections of these cells. Unpredictable rhythms may occur."
					image={gridseq}
					alignment="left"
				/>
			</div>
		);
	}
}

export default Home;
