import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			name: "CdnStarLogo3D",
			fileName: (format) => `cdn-star-logo.${format}.js`,
			formats: ["es", "umd"],
		},
		rollupOptions: {
			external: [],
		},
		sourcemap: true,
	},
	plugins: [
		dts({
			include: ["src/**/*.ts"],
			rollupTypes: true,
		}),
	],
	server: {
		port: 5180,
		open: "/examples/embed.html",
	},
});
