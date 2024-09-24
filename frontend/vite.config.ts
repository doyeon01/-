import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': process.env 
    },
    base: './',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'] // 확장자 우선 순위 설정
    }
});
