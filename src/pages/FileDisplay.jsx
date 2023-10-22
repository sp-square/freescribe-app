function FileDisplay({ file, audioStream, handleAudioReset }) {
	return (
		<main className="flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center text-center pb-20 w-fit max-w-full mx-auto">
			<h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
				Your <span className="text-blue-400 bold">File</span>
			</h1>
			<div className="flex flex-col mx-auto text-left my-4">
				<h3 className="font-semibold">Name:</h3>
				<p>{file.name}</p>
			</div>
			<div className="flex items-center justify-between gap-4">
				<button
					className="text-slate-400 hover:text-blue-600 duration-200 px-4 py-2 rounded-lg border-solid border-[1px] border-slate-300 hover:border-blue-400"
					onClick={handleAudioReset}
				>
					Reset
				</button>
				<button className="specialBtn px-3 py-2 rounded-lg text-blue-400 flex items-center gap-2 font-medium">
					<span>Transcribe</span>
					<i className="fa-regular fa-pen-to-square"></i>
				</button>
			</div>
		</main>
	);
}

export default FileDisplay;
