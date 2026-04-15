const dotEnv = require("dotenv");
dotEnv.config();

const app = require("./app");

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on this ${process.env.PORT} port number`)
});