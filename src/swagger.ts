// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerAutogen = require("swagger-autogen");

const outputFile = "../swagger_output.json";

const endpointFiles = ["./routes/teste.ts"];

const generateSwagger = async () => {
  await swaggerAutogen(outputFile, endpointFiles);
};

generateSwagger();
