// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerAutogen = require("swagger-autogen");

const doc = {
  info: {
    version: "1.0.0",
    title: "S.O.S Shelter",
    description: "",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    // by default: empty Array
    {
      name: "", // Tag name
      description: "", // Tag description
    },
    // { ... }
  ],
  securityDefinitions: {}, // by default: empty object
  definitions: {}, // by default: empty object
};

const outputFile = "../swagger_output.json";

const endpointFiles = ["./routes/*"];

const generateSwagger = async () => {
  await swaggerAutogen(outputFile, endpointFiles, doc);
};

generateSwagger();
