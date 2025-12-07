import { Border } from "./components/background/Border";
import { WelcomePage } from "./components/pageParts/welcomePage";
import { AboutPage } from "./components/pageParts/aboutPage";
import Navbar from "./components/navigation/Navbar";
import Circle from "./components/background/Circle";
import { ContactPage } from "./components/pageParts/contactPage";

export default function Home() {
	return (
		<>
			<div className="relative overflow-hidden">
				<div className="h-dvh w-full overflow-auto">
					<Navbar />
					<Border />
					<div className="bg-(--background-color) h-dvh overflow-auto">
						<main className="relative flex flex-col p-6 sm:p-16 gap-10">
							<div className="absolute min-w-[calc(100dvw-8rem)] min-h-[calc(100dvh-8rem)]">
								<Circle
									backgroundGradient="radial-gradient(circle, #a52727ff, #a13a20ff)"
									bottom={200}
									right={200}
									blurAmount={30}
									size={320}
								/>
								<Circle
									backgroundGradient="radial-gradient(circle, #ce3030ff, #cf4d2cff)"
									bottom={200}
									right={200}
									blurAmount={30}
									size={220}
								/>

								<Circle
									backgroundGradient="radial-gradient(circle, #1a52a7ff, #25256bff)"
									top={200}
									left={100}
									blurAmount={30}
									size={220}
								/>
								<Circle
									backgroundGradient="radial-gradient(circle, #2164c9ff, #3c3caaff)"
									top={200}
									left={100}
									blurAmount={30}
									size={120}
								/>
							</div>
							<div className="w-full h-full" id="welcomePage">
								<div className="relative flex min-h-[calc(100dvh-5rem)] w-full flex-col sm:min-h-[calc(100dvh-8rem)] sm:py-8 items-center justify-center border-b border-(--foreground-color)/10">
									<WelcomePage />
								</div>
							</div>
							<div className="px-6 w-full h-full" id="aboutPage">
								<AboutPage />
							</div>
							<div className="w-full h-200 pl-10" id="projectsPage">
								<h1 className="inline-block text-4xl font-semibold">
									My projects
								</h1>
								<div className="bg-red-500 inline-block rotate-30 -translate-y-6 px-1 rounded-lg font-bold">
									WIP
								</div>
							</div>
							<div className="w-full px-10" id="contactPage">
								<ContactPage />
							</div>
						</main>
					</div>
				</div>
			</div>
		</>
	);
}
