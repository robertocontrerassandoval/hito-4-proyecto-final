// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://hito-4-proyecto-final-1-ozdl.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
};
