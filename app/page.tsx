"use client";
import { Border } from "./components/background/Border";

export default function Home() {
	return (
		<>
			<Border />
			<div className="bg-(--background-color) w-full h-full overflow-y-scroll"></div>
		</>
	);
}
