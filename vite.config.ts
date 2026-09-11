import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const PORT = 9000;

export default defineConfig({
    plugins: [react()],
    server: { port: PORT },
    preview: { port: PORT },
});
