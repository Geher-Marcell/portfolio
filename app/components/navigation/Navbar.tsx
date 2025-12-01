"use client"
import { motion } from "motion/react";
import React from "react";

const links = [
    { href: "#welcomePage", label: "Home" },
    { href: "#aboutPage", label: "About" },
];

const Navbar: React.FC = () => {
    const animDelay = 1.2;
    const animDuration = 0.6;
    const autoScrollThreshold = 0.8;

    const [currentPage, setCurrentPage] = React.useState<string>("#welcomePage");
    const sectionRefs = React.useRef<Record<string, HTMLElement | null>>({});

    React.useEffect(() => {
        sectionRefs.current["#welcomePage"] = document.getElementById("welcomePage");
        sectionRefs.current["#aboutPage"] = document.getElementById("aboutPage");
    }, []);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setCurrentPage(`#${entry.target.id}`);
                    }
                });
            },
            { threshold: autoScrollThreshold }
        );

        Object.values(sectionRefs.current).forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    // Smooth scrolling to section and preventing default behavior
	const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
		event.preventDefault();
		const targetElement = document.querySelector(targetId);
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (<>
        <motion.div 
            id="navbar"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: animDelay, duration: animDuration, ease: "easeOut" }}
        >
            <div className="max-w-140 w-5/6 h-10 bg-neutral-900 absolute top-8 sm:top-14 left-1/2 -translate-x-1/2 rounded-lg shadow-lg z-50 overflow-hidden">
                <div className="flex justify-center items-center h-full">
                    <div className="w-fit gap-4 text-center justify-center h-full flex items-center px-4 relative">
                        {links.map((link) => (
                            <React.Fragment key={link.href}>
                                <a
									href={link.href}
									onClick={(event) => handleLinkClick(event, link.href)}
									className={`relative px-3 py-2 text-(--foreground-color)`}
								>
									{link.label}
									{link.href === currentPage && (
										<motion.div 
											layoutId="underline"
											className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-700 rounded-full"
											transition={{ type: "spring", stiffness: 500, damping: 30 }}
										/>
									)}
								</a>
							</React.Fragment>
						))}
                    </div>
                </div>
            </div>
        </motion.div>
    </>)
};
export default Navbar;