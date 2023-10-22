import { useState } from 'react';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import FileDisplay from './pages/FileDisplay';

function App() {
	const [file, setFile] = useState(null); // uploaded file
	const [audioStream, setAudioStream] = useState(null); // live recording

	const isAudioAvailable = file || audioStream;
	// const isAudioAvailable = true;

	function handleAudioReset() {
		setFile(null);
		setAudioStream(null);
	}

	return (
		<div className="flex flex-col max-w-[1000px] mx-auto w-full">
			<section className="min-h-screen flex flex-col">
				<Header />
				{isAudioAvailable ? (
					<FileDisplay
						file={file}
						audioStream={audioStream}
						handleAudioReset={handleAudioReset}
					/>
				) : (
					<Homepage setFile={setFile} setAudioStream={setAudioStream} />
				)}
			</section>
			<footer></footer>
		</div>
	);
}

export default App;
