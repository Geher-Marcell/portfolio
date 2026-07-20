import { motion } from "motion/react";
import GitHubCalendar from "../common/GitHubCalendar";
import { Card } from "../common/Card";
import CountUp from "../common/CountUp";

const Cards = [
	{ title: "Projects Built", value: 2 },
	{ title: "Github Repos", value: 10, suffix: "+" },
	{ title: "Certifications", value: 1 },
	{ title: "Lines Written", value: 9999, suffix: "+" },
];

export const AboutPage = () => {
	return (
		<>
			<div className="gap-4 flex flex-col items-center justify-between">
				<Card className="max-w-300 text-justify">
					<h1 className="font-bold mb-2">About me</h1>
					<div className="pl-2">
						Hi, I&apos;m Marcell Gehér and I build full-stack web
						applications using <b>Next.js</b>! I develop modern,
						responsive, and user-friendly web applications that
						solve real problems. I&apos;m also keen on creating
						desktop applications using <b>C#</b> (.NET and Unity),
						and I have experience in <b>PHP</b> and <b>Java</b>{" "}
						development.
					</div>
				</Card>
				<div className="w-full h-full xl:h-76 gap-4 flex flex-col xl:flex-row justify-center items-center">
					<Card>
						<h1 className="font-bold mb-2">Education</h1>
						<div className="pl-2">
							<div className="relative flex flex-col gap-2 border-l-2 border-red-800/60 p-4">
								<div className="w-4 h-4 -translate-x-1/2 absolute top-0 -left-px bg-red-800 rounded-full" />
								<h1>Egyetem</h1>
								<p>2026 - Present</p>
								<p>Idk</p>
							</div>
							<div className="relative flex flex-col gap-2 border-l-2 border-red-800/60 p-4">
								<div className="w-4 h-4 -translate-x-1/2 absolute top-0 -left-px bg-red-800 rounded-full" />
								<h1>Jedlik Ányos Technikum</h1>
								<p>2021 - 2026</p>
								<p>
									I was a student here studying computer
									science.
								</p>
							</div>
						</div>
					</Card>
					<Card className="h-76">
						<img
							src="https://placehold.co/180x270"
							alt="Profile Picture"
							width={180}
							height={270}
						/>
					</Card>
					<div className="w-fit h-full md:h-76 grid grid-cols-2 gap-4">
						{Cards.map((card, index) => (
							<Card
								className="w-28 h-28 md:w-36 md:h-36 flex flex-col justify-center items-center"
								key={index}
							>
								<h1 className="text-red-500 font-bold text-4xl md:text-5xl">
									<CountUp
										target={card.value}
										suffix={card.suffix}
									/>
								</h1>
								<p className="text-neutral-400 text-sm text-nowrap">
									{card.title}
								</p>
							</Card>
						))}
					</div>
				</div>
				<Card className="w-full xl:w-fit">
					<h1 className="font-bold mb-2">Github Contributions</h1>
					<GitHubCalendar
						username="Geher-Marcell"
						cellSize={15}
						cellGap={4}
						colors={{
							empty: "#252525",
						}}
					/>
				</Card>
			</div>
		</>
	);
};
