module.exports = {
  apps: [
    {
      script:
        "npx turbo run build --filter=management-api && npm start -w management-api",
      watch: false,
      name: "SHOP MASTER - management-api",

      error_file: "./logs/management-api/error.log",
      out_file: "./logs/management-api/out.log",
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
  ],
};
