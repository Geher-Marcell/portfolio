import { Border } from "./components/background/Border";
import { WelcomePage } from "./components/pageParts/welcomePage";
import { AboutPage } from "./components/pageParts/aboutPage";
import Navbar from "./components/navigation/Navbar";

export default function Home() {
	return (
		<>
			<div className="relative overflow-hidden">
				<div className="h-dvh w-full overflow-auto">
					<Navbar />
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
