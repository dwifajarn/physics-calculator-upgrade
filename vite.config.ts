import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { fileURLToPath, URL } from "node:url"

// https://vitejs.dev/config/
//
// `base` controls the public path used for all assets.
// - "./"  → relative paths, works on GitHub Pages, any sub-folder, and file://
// - "/"   → server root (default for local dev)
// The GitHub Actions workflow sets VITE_BASE=/<repo-name>/ automatically,
// but relative "./" is also safe and keeps local previews working.
export default defineConfig(({ mode }) => {
  const base = process.env.VITE_BASE ?? (mode === "production" ? "./" : "/")

  return {
    base,
    plugins: [react()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  }
})
