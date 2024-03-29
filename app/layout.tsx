import React from "react";
import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "FitViber";
const APP_DEFAULT_TITLE = "Fit Viber | Your workout wiz";
const APP_TITLE_TEMPLATE = "%s - FitViber";
const APP_DESCRIPTION = "Your workout wiz";

export const metadata: Metadata = {
	applicationName: APP_NAME,
	title: {
		default: APP_DEFAULT_TITLE,
		template: APP_TITLE_TEMPLATE,
	},
	description: APP_DESCRIPTION,
	manifest: "/manifest.json",
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
		title: APP_DEFAULT_TITLE,
		startupImage: ["/icons/icon-ios-app.png"],
	},
	icons: { apple: "/icons/icon-ios-app.png" },
};

export const viewport: Viewport = {
	themeColor: "#FFFFFF",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				{children}
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
}
