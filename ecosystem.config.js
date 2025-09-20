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
    {
      script:
        "npx turbo run build --filter=billing-api && npm start -w billing-api",
      watch: false,
      name: "SHOP MASTER - billing",

      error_file: "./logs/billing/error.log",
      out_file: "./logs/billing/out.log",
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
  ],
};
