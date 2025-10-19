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
      name: "SHOP MASTER - billing-api",

      error_file: "./logs/billing/error.log",
      out_file: "./logs/billing/out.log",
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
    {
      script:
        "npx turbo run build --filter=billing && npx serve -s apps/billing/dist -l 3001",
      watch: false,
      name: "SHOP MASTER - billing-frontend",

      error_file: "./logs/billing-frontend/error.log",
      out_file: "./logs/billing-frontend/out.log",
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
    {
      script:
        "npx turbo run build --filter=shop-master-ui && npx serve -s apps/shop-master-ui/dist -l 3002",
      watch: false,
      name: "SHOP MASTER - shop-master-frontend",

      error_file: "./logs/shop-master-frontend/error.log",
      out_file: "./logs/shop-master-frontend/out.log",
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
  ],
};
