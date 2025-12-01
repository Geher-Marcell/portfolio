import { Border } from "./components/background/Border";
import { WelcomePage } from "./components/pageParts/welcomePage";
import { AboutPage } from "./components/pageParts/aboutPage";

export default function Home() {
	return (
		<>
			<div className="relative overflow-hidden">
				<div className="h-dvh w-full overflow-auto">
					{/* <div id="navbar">
						<div className="max-w-140 w-5/6 h-10 bg-neutral-900 absolute top-8 sm:top-14 left-1/2 -translate-x-1/2 rounded-lg shadow-lg z-50">
							<div className="flex items-center bg-red-500 h-full">
								<div className="w-fit bg-blue-500 space-x-4 text-center justify-center h-full">
									<a href="#welcomePage">
										Home
									</a>
									<a href="#aboutPage">
										About
									</a>
								</div>
							</div>
						</div>
					</div> */}
					<Border />
					<div className="bg-(--background-color) h-dvh overflow-auto">
						<main className="relative flex flex-col p-6 sm:p-16 gap-10">
							<div className="w-full h-full" id="welcomePage">
								<div className="relative flex min-h-[calc(100dvh-5rem)] w-full flex-col sm:min-h-[calc(100dvh-8rem)] sm:py-8 items-center justify-center border-b border-(--foreground-color)/10">
									<WelcomePage />
								</div>
							</div>
							<div className="w-full h-full" id="aboutPage">
								<AboutPage />
							</div>
						</main>
					</div>
				</div>
			</div>
		</>
	);
}
