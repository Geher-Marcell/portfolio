import Link from "next/link";
import Image from "next/image";

export const AboutPage = () => {
	return (
		<>
			<div className="text-lg space-y-4">
				<h1 className="text-4xl font-semibold mb-8">About Me</h1>
				<p>
					Hi, I&apos;m Gehér Marcell and I build full-stack web applications
					using <b>Next.js</b>.
				</p>
				<p>
					I develop modern, responsive, and user-friendly web applications that
					solve real problems. I&apos;m also keen on creating desktop
					applications using <b>C#</b> (.NET and Unity), and I have experience
					in <b>PHP</b> and <b>Java</b> development.
				</p>
				<p>
					I&apos;m currently a fifth-year computer science student at the Jedlik
					Ányos high school in Győr, Hungary. I&apos;m passionate about coding
					and always eager to learn new technologies and improve my skills.
				</p>
				<div className="space-x-4">
					<Link
						href="https://github.com/Geher-Marcell"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block hover:scale-105 transition-transform active:scale-95"
					>
						<Image src="/github.svg" alt="GitHub" width={34} height={34} />
					</Link>
					<Link
						href="https://www.linkedin.com/in/marcell-gehér"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block hover:scale-105 transition-transform active:scale-95"
					>
						<Image src="/linkedin.svg" alt="LinkedIn" width={34} height={34} />
					</Link>
				</div>
			</div>
		</>
	);
};
