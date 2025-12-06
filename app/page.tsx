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
								<h1 className="inline-block text-4xl font-semibold">
									Get In Touch
								</h1>
								<div className="bg-red-500 inline-block rotate-30 -translate-y-6 px-1 rounded-lg font-bold">
									WIP
								</div>
								<div className="w-full mx-auto h-full flex flex-col md:flex-row gap-10 items-center py-10">
									<div className="w-full grid grid-cols-2 gap-4">
										<div className="flex flex-col">
											<label htmlFor="name" className="ml-1 mb-1">
												Your Name
											</label>
											<input
												className="bg-(--background-muted) border border-neutral-600 p-2 rounded-lg"
												type="text"
												id="name"
												name="name"
												placeholder="John Doe"
											/>
										</div>
										<div className="flex flex-col">
											<label htmlFor="email" className="ml-1 mb-1">
												Email Address
											</label>
											<input
												className="bg-(--background-muted) border border-neutral-600 p-2 rounded-lg"
												type="email"
												id="email"
												name="email"
												placeholder="johndoe@example.com"
											/>
										</div>
										<div className="flex flex-col col-span-2">
											<label htmlFor="message" className="ml-1 mb-1">
												Message
											</label>
											<textarea
												placeholder="Write something...."
												className="bg-(--background-muted) border border-neutral-600 p-2 rounded-lg"
												id="message"
												name="message"
												rows={5}
												maxLength={400}
												style={{ resize: "none" }}
											></textarea>
										</div>
										<div className="flex flex-col col-span-2">
											<button className="bg-red-800 p-2 rounded-lg">
												Send Message
											</button>
										</div>
									</div>
									<div className="w-full space-y-2">
										<div>
											<p className="text-(--foreground-muted)">Email:</p>
											<p className="font-bold">example@gmail.com</p>
										</div>
										<div>
											<p className="text-(--foreground-muted)">Phone:</p>
											<p className="font-bold">+36 50 111 2222</p>
										</div>
										<div>
											<p className="text-(--foreground-muted)">Address:</p>
											<p className="font-bold text-(--foreground-muted)">
												No address as of now
											</p>
										</div>
										<div>
											<p className="text-(--foreground-muted)">Follow me</p>
											<div className="flex gap-2">
												<p>Instagram</p>
												<p>Facebook</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</main>
					</div>
				</div>
			</div>
		</>
	);
}
