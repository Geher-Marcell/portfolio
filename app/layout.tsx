import "./globals.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<title>Gehér Marcell | Fullstack web developer</title>
			</head>
			<body className="w-screen h-dvh">{children}</body>
		</html>
	);
}
