module.exports = {
  apps: [
    {
      script: "./apps/management-api/dist/index.js",
      watch: false,
      name: "SHOP MASTER - management-api",
      error_file: "./logs/management-api/error.log",
      out_file: "./logs/management-api/out.log",
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
  ],
};
