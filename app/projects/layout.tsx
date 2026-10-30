import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function ProjectsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-dvh w-full overflow-auto bg-(--background-color)">
			<header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/85 backdrop-blur">
				<div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
					<Link
						href="/"
						className="flex items-center gap-2 text-sm font-semibold text-(--foreground-muted) transition-colors hover:text-(--foreground-color)">
						<FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
						Gehér Marcell
					</Link>
					<nav aria-label="Projects" className="flex items-center gap-5 text-sm">
						<Link
							href="/projects"
							className="text-(--foreground-muted) transition-colors hover:text-(--foreground-color)">
							All projects
						</Link>
						<Link
							href="/#contactPage"
							className="text-(--foreground-muted) transition-colors hover:text-(--foreground-color)">
							Contact
						</Link>
					</nav>
				</div>
			</header>
			{children}
			<footer className="border-t border-white/10">
				<div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
					<p>© {new Date().getFullYear()} Gehér Marcell</p>
					<Link
						href="/"
						className="transition-colors hover:text-(--foreground-color)">
						Back to portfolio
					</Link>
				</div>
			</footer>
		</div>
	);
}
