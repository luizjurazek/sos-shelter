import app from "./app";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
