const config = {
  development: {
    API_URL: "http://localhost:3001",
  },
  staging: {},
  production: {},
};

export default {
  ...config[process.env.REACT_APP_STAGE || "development"],
};
