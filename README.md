##  👉if you want to run a simple react vite app on linux server make sure that at vite.config.js has the below code.
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
  host: true,
  port: 5173
  }
})
```

## The code is live at:
`https://kabitha-sharma.onrender.com/`
