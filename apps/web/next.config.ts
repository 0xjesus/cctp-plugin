import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typedRoutes: true,
	reactCompiler: true,
	// Empty turbopack config to silence webpack warning and disable source map processing
	// This also works around Bun/Linux source map compatibility issues
	turbopack: {},
};

export default nextConfig;
