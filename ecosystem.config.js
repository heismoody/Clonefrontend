/** @type {import('pm2').StartOptions[]} */
const apps = [
  {
    name: "clonefrontend",
    script: "node_modules/next/dist/bin/next",
    args: "start -H 127.0.0.1 -p 3000",
    cwd: __dirname,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: false,
    max_memory_restart: "1G",
    env: {
      NODE_ENV: "production",
      PORT: 3000,
    },
  },
];

module.exports = { apps };
