import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
	dest: "public",
	disable: false,
	cacheOnFrontEndNav: true,
	aggressiveFrontEndNavCaching: true,
});

export default withPWA({
	// Your Next.js config
});
