// ecosystem.config.js
module.exports = {
    apps: [{
      name: 'myApp',
      script: 'build/index.js',
      // interpreter: 'ts-node',
      // node_args: ['--require=tsconfig-paths/register'],
      exec_mode: 'cluster', // enables clustering
      instances: 'max',
      autorestart: true,
      // watch: ["build"],
      log_date_format  : "YYYY-MM-DD HH:mm:ss",
      max_memory_restart: '1024M',
      env: {
        NODE_ENV: 'development'
      }, 
      env_production: {
        NODE_ENV: 'production'
      }
    },
  ]
  
  
  }
  