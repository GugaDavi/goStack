module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'goBarber',
  define: {
    timestamps: true,
    underscord: true,
    underscordAll: true,
  },
};
