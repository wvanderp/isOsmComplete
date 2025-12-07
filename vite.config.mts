/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
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
