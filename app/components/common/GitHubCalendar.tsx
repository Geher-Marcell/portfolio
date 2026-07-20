"use client";

import { useEffect, useState, useMemo } from "react";

interface ContributionDay {
	date: string;
	intensity: string;
	count: number;
}

type ContributionWeek = ContributionDay[];

interface GitHubCalendarResponse {
	total: number;
	contributions: ContributionWeek[];
}

interface GitHubCalendarProps {
	username: string;
	startDate?: string;
	endDate?: string;
	colors?: {
		empty?: string;
		low?: string;
		medium?: string;
		high?: string;
		max?: string;
	};
	cellSize?: number;
	cellGap?: number;
	showLabels?: boolean;
	showTotal?: boolean;
}

const DEFAULT_COLORS = {
	empty: "#161b22",
	low: "#0e4429",
	medium: "#006d32",
	high: "#26a641",
	max: "#39d353",
};

const COLOR_ORDER: Array<keyof typeof DEFAULT_COLORS> = [
	"empty",
	"low",
	"medium",
	"high",
	"max",
];

const WEEKDAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

const MONTH_LABELS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

export default function GitHubCalendar({
	username,
	startDate,
	endDate,
	colors = {},
	cellSize = 11,
	cellGap = 3,
	showLabels = true,
	showTotal = true,
}: GitHubCalendarProps) {
	const [calendarData, setCalendarData] = useState<GitHubCalendarResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const resolvedColors = useMemo(() => ({ ...DEFAULT_COLORS, ...colors }), [colors]);

	useEffect(() => {
		let cancelled = false;

		async function fetchData() {
			setLoading(true);
			setError(null);

			try {
				const res = await fetch(`/api/github-calendar?username=${encodeURIComponent(username)}`);
				if (!res.ok) {
					throw new Error(`Failed to fetch: ${res.status}`);
				}
				const data: GitHubCalendarResponse = await res.json();
				if (!cancelled) {
					setCalendarData(data);
				}
			} catch (err) {
				if (!cancelled) {
					setError(err instanceof Error ? err.message : "Unknown error");
				}
			} finally {
				if (!cancelled) {
					setLoading(false);
				}
			}
		}

		fetchData();
		return () => { cancelled = true; };
	}, [username]);

	const filteredWeeks = useMemo(() => {
		if (!calendarData) return [];

		const start = startDate ? new Date(startDate) : null;
		const end = endDate ? new Date(endDate) : null;

		if (!start && !end) return calendarData.contributions;

		return calendarData.contributions
			.map((week) =>
				week.filter((day) => {
					const dayDate = new Date(day.date);
					if (start && dayDate < start) return false;
					if (end && dayDate > end) return false;
					return true;
				})
			)
			.filter((week) => week.length > 0);
	}, [calendarData, startDate, endDate]);

	const totalFiltered = useMemo(
		() => filteredWeeks.reduce((sum, week) => sum + week.reduce((ws, day) => ws + day.count, 0), 0),
		[filteredWeeks]
	);

	const monthLabels = useMemo(() => {
		if (filteredWeeks.length === 0) return [];

		const labels: { month: string; index: number }[] = [];
		let lastMonth = -1;

		filteredWeeks.forEach((week, weekIndex) => {
			const firstDay = week[0];
			if (!firstDay) return;
			const month = new Date(firstDay.date).getMonth();
			if (month !== lastMonth) {
				labels.push({ month: MONTH_LABELS[month], index: weekIndex });
				lastMonth = month;
			}
		});

		return labels;
	}, [filteredWeeks]);

	const fontSize = Math.round(cellSize * 0.85);
	const leftLabelWidth = Math.round(cellSize * 3.5);
	const topLabelHeight = Math.round(cellSize * 2.2);

	const gridWidth = filteredWeeks.length * (cellSize + cellGap) - cellGap;
	const gridHeight = 7 * (cellSize + cellGap) - cellGap;
	const totalWidth = showLabels ? gridWidth + leftLabelWidth : gridWidth;
	const totalHeight = showLabels ? gridHeight + topLabelHeight : gridHeight;

	if (loading) {
		return (
			<div className="flex items-center justify-center p-8">
				<div className="text-(--foreground-muted) text-sm">Loading contributions...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center p-8">
				<div className="text-red-400 text-sm">Error: {error}</div>
			</div>
		);
	}

	if (filteredWeeks.length === 0) {
		return (
			<div className="flex items-center justify-center p-8">
				<div className="text-(--foreground-muted) text-sm">No contribution data found</div>
			</div>
		);
	}

	return (
		<div className="w-full overflow-x-auto">
			<svg
				width={totalWidth}
				height={totalHeight}
				viewBox={`0 0 ${totalWidth} ${totalHeight}`}
				className="block"
			>
				{showLabels && (
					<>
						{monthLabels.map(({ month, index }) => (
							<text
								key={`${month}-${index}`}
								x={leftLabelWidth + index * (cellSize + cellGap)}
								y={topLabelHeight * 0.55}
								className="fill-(--foreground-muted)"
								fontSize={fontSize}
							>
								{month}
							</text>
						))}
						{WEEKDAY_LABELS.map((label, i) =>
							label ? (
								<text
									key={i}
									x={0}
									y={topLabelHeight + i * (cellSize + cellGap) + cellSize / 2 + fontSize * 0.3}
									className="fill-(--foreground-muted)"
									fontSize={fontSize}
									textAnchor="start"
								>
									{label}
								</text>
							) : null
						)}
					</>
				)}

				{filteredWeeks.map((week, weekIndex) =>
					week.map((day) => {
						const dayOfWeek = new Date(day.date).getDay();
						const intensityIdx = parseInt(day.intensity, 10);
						const colorKey = COLOR_ORDER[intensityIdx] ?? "empty";
						const fill = resolvedColors[colorKey] ?? resolvedColors.empty;
						const x = (showLabels ? leftLabelWidth : 0) + weekIndex * (cellSize + cellGap);
						const y = (showLabels ? topLabelHeight : 0) + dayOfWeek * (cellSize + cellGap);

						return (
							<rect
								key={day.date}
								x={x}
								y={y}
								width={cellSize}
								height={cellSize}
								rx={2}
								ry={2}
								fill={fill}
							>
								<title>
									{day.count} contributions on {day.date}
								</title>
							</rect>
						);
					})
				)}
			</svg>

			<div className="mt-2 flex items-center justify-between text-xs text-(--foreground-muted)">
				{showTotal && (
					<p className="text-sm text-(--foreground-color)">
						<strong>{totalFiltered.toLocaleString()}</strong> contributions
					</p>
				)}
				<div className="flex items-center gap-1">
					<span>Less</span>
					{COLOR_ORDER.map((key) => (
						<svg key={key} width={cellSize} height={cellSize}>
							<rect
								width={cellSize}
								height={cellSize}
								rx={2}
								ry={2}
								fill={resolvedColors[key]}
							/>
						</svg>
					))}
					<span>More</span>
				</div>
			</div>
		</div>
	);
}
