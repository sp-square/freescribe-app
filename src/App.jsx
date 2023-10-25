import { useState } from 'react';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import FileDisplayPage from './pages/FileDisplayPage';
import InformationPage from './pages/InformationPage';
import ProgressPage from './pages/ProgressPage';

function App() {
	const [file, setFile] = useState(null); // uploaded file
	const [audioStream, setAudioStream] = useState(null); // live recording
	const [output, setOutput] = useState(null); // transcribed text
	const [loading, setLoading] = useState(false); // loading state
	const [finished, setFinished] = useState(false); // finished state

	const isAudioAvailable = file || audioStream;

	function handleAudioReset() {
		setFile(null);
		setAudioStream(null);
	}

	return (
		<div className="flex flex-col max-w-[1000px] mx-auto w-full">
			<section className="min-h-screen flex flex-col">
				<Header />
				{output ? (
					<InformationPage />
				) : loading ? (
					<ProgressPage />
				) : isAudioAvailable ? (
					<FileDisplayPage
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
