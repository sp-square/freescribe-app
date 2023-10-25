import { useState, useEffect, useRef } from 'react';

function Homepage({ setFile, setAudioStream }) {
	const [recordingStatus, setRecordingStatus] = useState('inactive');
	const [audioChunks, setAudioChunks] = useState([]);
	const [duration, setDuration] = useState(0);

	const mediaRecorder = useRef(null);
	const mimeType = 'audio/webm';

	async function startRecording() {
		let tempStream;
		console.log('Start recording');
		// Get the audio stream from the user's microphone
		try {
			const streamData = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: false,
			});
			tempStream = streamData;
		} catch (error) {
			console.log(error);
		}
		setRecordingStatus('recording');

		// Create a new MediaRecorder instance using the stream
		const media = new MediaRecorder(tempStream, { type: mimeType });
		// Set the mediaRecorder reference
		mediaRecorder.current = media;
		// Start recording
		mediaRecorder.current.start();
		let localAudioChunks = [];
		mediaRecorder.current.ondataavailable = (event) => {
			if (typeof event.data === 'undefined') return;
			if (event.data.size === 0) return;
			localAudioChunks.push(event.data);
		};
		setAudioChunks(localAudioChunks);
	}

	function stopRecording() {
		console.log('Stop recording');
		mediaRecorder.current.stop();
		mediaRecorder.current.onstop = () => {
			const audioBlob = new Blob(audioChunks, { type: mimeType });
			console.log('audioBlob', audioBlob);
			setAudioStream(audioBlob);
			setAudioChunks([]);
			setDuration(0);
			setRecordingStatus('inactive');
		};
	}

	// Count duration of the recording
	const intervalRef = useRef(null); // to hold a reference to the interval function (to be able to clear it later)
	useEffect(() => {
		if (recordingStatus === 'inactive') return;
		intervalRef.current = setInterval(() => {
			setDuration((curr) => {
				return curr + 1;
			});
		}, 1000);
		return () => {
			clearInterval(intervalRef.current);
		};
	}, [recordingStatus]);

	return (
		<main className="flex-1 p-4 flex flex-col gap-3 sm:gap-4 justify-center text-center pb-20">
			<h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
				Free<span className="text-blue-400 bold">Scribe</span>
			</h1>
			<h3 className="font-medium md:text-lg">
				Record <span className="text-blue-400">&rarr;</span> Transcribe{' '}
				<span className="text-blue-400">&rarr;</span> Translate
			</h3>
			<button
				className="flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4 specialBtn px-4 py-2 rounded-xl"
				onClick={
					recordingStatus === 'recording' ? stopRecording : startRecording
				}
			>
				<span className="text-blue-400">
					{recordingStatus === 'inactive' ? 'Record' : `Stop recording`}
				</span>
				<div className="flex items-center gap-2">
					{recordingStatus === 'recording' && (
						<span className="text-sm">{duration}s</span>
					)}
					<i
						className={`fa-solid fa-microphone duration-200 ${
							recordingStatus === 'recording' && 'text-rose-400'
						}`}
					></i>
				</div>
			</button>
			<p className="text-base">
				Or{' '}
				<label className="text-blue-400 cursor-pointer hover:text-blue-600 duration-200">
					upload{' '}
					<input
						type="file"
						className="hidden"
						accept=".mp3,.wave"
						onChange={(e) => setFile(e.target.files[0])}
					/>
				</label>{' '}
				a mp3 file
			</p>
			<p className="italic text-slate-400">Free Now, Free Forever</p>
		</main>
	);
}

export default Homepage;
