import path from "path";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

// ----------------------------------------------------------------------

const PORT = 3000;

export default defineConfig({
	plugins: [
		react(),
		checker({
			typescript: true,
			eslint: {
				useFlatConfig: true,
				lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
				dev: { logLevel: ["error"] },
			},
			overlay: {
				position: "tl",
				initialIsOpen: false,
			},
		}),
	],
	resolve: {
		alias: [
			{
				find: /^src(.+)/,
				replacement: path.resolve(process.cwd(), "src/$1"),
			},
		],
	},
	server: { port: PORT, host: true },
	preview: { port: PORT, host: true },
});
