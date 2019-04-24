module.exports = {
  mysql: {
    host: 'localhost',
    username: 'ragnarok', // Mysql server username for logging in
    password: 'ragnarok', // Mysql server password
    database: 'ragnarok', // Database name, where it contains your ragnarok server files
    port: 3306 // Port for connecting to mysql server
  },

  web: {
    host: 'localhost', // The host for the website
    port: 80, // Website Port to listen
    title: 'NodeCP', // The title for each page
    navbarsDisplay: [ // Display names for navbars
      {
        name: "Home",
        href: "/"
      },
      {
        name: "Status",
        href: "/status"
      }
    ] 
  },

  server: {
    host: 'localhost', // The host for the rAthena Server
    ports: {
      login: 6900, // Login Server Port
      char: 6121, // Character Server Port
      map: 5121 // Map server Port
    },
    updateStatusInterval: 10000 // the amount of time in ms to wait before getting a status request to the server
  },

  hashpassword: false, // Whether or not to hash passwords to md5
  secret: 'nodecp', // Secret for the authorization, just don't touch.
};