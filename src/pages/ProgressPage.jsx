function ProgressPage({ downloading }) {
	return (
		<div className="flex flex-col flex-1 items-center justify-center gap-10 md:gap-14 pb-24 text-center">
			<div className="flex flex-col gap-2 sm:gap-4">
				<h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
					<span className="text-blue-400 bold">Transcribing</span>
				</h1>
				<p>{downloading ? 'core cylinders engaged' : 'warming up cylinders'}</p>
			</div>
			<div className="flex flex-col gap-2 sm:gap-4 max-w-[500px] mx-auto w-full">
				{[0, 1, 2].map((val) => (
					<div
						key={val}
						className={`rounded-full h-2 sm:h-3 bg-slate-400 loading loading${val}`}
					></div>
				))}
			</div>
		</div>
	);
}

export default ProgressPage;
