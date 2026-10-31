"use client";
import { Border } from "./components/background/Border";
import { WelcomePage } from "./components/pageParts/welcomePage";
import { AboutPage } from "./components/pageParts/aboutPage";
import Navbar from "./components/navigation/Navbar";
import Circle from "./components/background/Circle";
import { useEffect, useRef } from "react";
import { ContactPage } from "./components/pageParts/contactPage";
import { ProjectsPage } from "./components/pageParts/projectPage";
import { useHashScroll } from "./components/utils/useHashScroll";

export default function Home() {
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	// The page scrolls inside a nested container, not the window, so the
	// browser's native hash scrolling misses when arriving from another route.
	useHashScroll(scrollContainerRef);

	return (
		<>
			<div className="relative overflow-hidden">
				<div className="h-dvh w-full overflow-auto">
					<Navbar scrollRef={scrollContainerRef} />
					<Border />
					<div
						ref={scrollContainerRef}
						className="bg-(--background-color) h-dvh overflow-auto">
						<main className="relative flex flex-col p-2 sm:p-16 gap-10">
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
							<section
								className="w-full h-full"
								id="homePage"
								aria-label="Introduction">
								<div className="relative flex min-h-[calc(100dvh-5rem)] w-full flex-col sm:min-h-[calc(100dvh-8rem)] sm:py-8 items-center justify-center border-b border-(--foreground-color)/10">
									<WelcomePage />
								</div>
							</section>
							<section
								className="px-10 w-full"
								id="aboutPage"
								aria-label="About">
								<AboutPage />
							</section>
							<section
								className="w-full px-10"
								id="projectsPage"
								aria-label="Projects">
								<ProjectsPage />
							</section>
							<section
								className="w-full px-10"
								id="contactPage"
								aria-label="Contact">
								<ContactPage />
							</section>
						</main>
					</div>
				</div>
			</div>
		</>
	);
}
