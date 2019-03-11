const configs = {
  env: process.env.NODE_ENV || 'local',
  dist: process.env.DIST_FOLDER || '../dist',
  server: {
    name: 'Rent Bot UI',
    maxConnections: 256,
    port: process.env.PORT || 3000
  }
};

export default configs;
