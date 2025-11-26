"use client";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Border } from "./components/background/Border";

export default function Home() {
	return (
		<>
			<Border />
			<div className="bg-(--background-color) w-full h-full"></div>
		</>
	);
}
