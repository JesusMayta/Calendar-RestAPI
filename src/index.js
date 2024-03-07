const Server = require("./presentation/server");

const main = () => {
    const server = new Server();
    server.listen();
};

main();