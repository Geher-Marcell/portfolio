import { Border } from "./components/background/Border";
import { WelcomePage } from "./components/pageParts/welcomePage";

export default function Home() {
	return (
		<>
			<div className="relative overflow-hidden">
				<div className="h-dvh w-full overflow-auto">
					<Border />
					<div className="bg-(--background-color) h-dvh overflow-auto">
						<main className="relative flex flex-col p-10 sm:p-16">
							<div className="w-full h-full" id="welcomePage">
								<div className="relative flex min-h-[calc(100dvh-5rem)] w-full flex-col sm:min-h-[calc(100dvh-8rem)] sm:py-8 items-center justify-center">
									<WelcomePage />
								</div>
							</div>
						</main>
					</div>
				</div>
			</div>
		</>
	);
}
