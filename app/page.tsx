import { Border } from "./components/background/Border";
import { WelcomePage } from "./components/pageParts/welcomePage";
import { AboutPage } from "./components/pageParts/aboutPage";
import Navbar from "./components/navigation/Navbar";
import Circle from "./components/background/Circle";

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
									{/* <Circle
										backgroundGradient="linear-gradient(45deg, #ac2b2b, #db4e2aff)"
										bottom={-120}
										right={-80}
										blurAmount={80}
										size={320}
									/>
									<Circle
										backgroundGradient="linear-gradient(225deg, #3636adff, #1a52a7)"
										top={200}
										left={100}
										blurAmount={80}
										size={220}
									/> */}
									<WelcomePage />
								</div>
							</div>
							<div className="w-full h-full" id="aboutPage">
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
							<div className="w-full h-200 pl-10" id="contactPage">
								<h1 className="inline-block text-4xl font-semibold">
									Let&apos;s get in touch
								</h1>
								<div className="bg-red-500 inline-block rotate-30 -translate-y-6 px-1 rounded-lg font-bold">
									WIP
								</div>
							</div>
						</main>
					</div>
				</div>
			</div>
		</>
	);
}
