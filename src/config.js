const config = {
  development: {
    API_URL: "http://localhost:3001",
    GOOGLE_CLIENT_ID:
      "947461217948-9krhfdnk4iqjsv52m347qvnodi4umvtq.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
  },
  staging: {},
  production: {},
};

export default {
  ...config[process.env.REACT_APP_STAGE || "development"],
};
