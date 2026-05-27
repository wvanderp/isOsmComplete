/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
    publicDir: './data',
    plugins: [
        tailwindcss(),
        react(),
        viteStaticCopy({
            targets: [
                {
                    src: './data/graphs',
                    dest: './'
                }
            ]
        })
    ],
    build: {
        outDir: './gitBuild',
        emptyOutDir: true
    },
    base: '/isOsmComplete/'
});
