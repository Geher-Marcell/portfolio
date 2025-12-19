"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faReact } from "@fortawesome/free-brands-svg-icons";

export default function DynamicFAIcon({
	exportName,
	size,
	className,
}: {
	exportName: string;
	size?:
		| "lg"
		| "xs"
		| "sm"
		| "1x"
		| "2x"
		| "3x"
		| "4x"
		| "5x"
		| "6x"
		| "7x"
		| "8x"
		| "9x"
		| "10x";
	className?: string;
}) {
	const [icon, setIcon] = useState<IconDefinition | null>(null);
	// console.log("Dynamically imported icon:", exportName);

	useEffect(() => {
		let mounted = true;
		// Try to import from solid first, then brands
		import("@fortawesome/free-solid-svg-icons").then((modSolid) => {
			const modSolidTyped = modSolid as unknown as Record<
				string,
				IconDefinition | undefined
			>;
			const foundSolid = modSolidTyped[exportName];
			if (mounted && foundSolid) {
				setIcon(foundSolid);
			} else {
				import("@fortawesome/free-brands-svg-icons").then((modBrands) => {
					const modBrandsTyped = modBrands as unknown as Record<
						string,
						IconDefinition | undefined
					>;
					const foundBrands = modBrandsTyped[exportName];
					if (mounted && foundBrands) setIcon(foundBrands);
				});
			}
		});
		return () => {
			mounted = false;
		};
	}, [exportName]);

	if (!icon) return null;
	return <FontAwesomeIcon icon={icon} size={size} className={className} />;
}
