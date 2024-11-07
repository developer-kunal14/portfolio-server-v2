/**
 * Server Startup Script
 * Project: Kunal Chandra Das Portfolio
 * Author: Kunal Chandra Das
 * Date: 29/10/2024
 * Version: 2.0.0
 *
 * Description:
 * This script initializes and starts the Express server for the Kunal Chandra Das Portfolio
 * application. It configures the server to listen on a specified port and establishes a connection
 * to the database before starting the server.
 *
 * Functionality:
 * - Imports configuration settings from the environment configuration file.
 * - Establishes a connection to the database using a dedicated connection function.
 * - Sets up the server to listen on the specified port (defaulting to 5000 if not provided).
 * - Logs a message to the console indicating the server is running and the port it's listening on.
 *
 * Usage:
 * Run this script to start the backend server for the portfolio application. It ensures that
 * the database connection is established before the server begins accepting requests.
 */

import envConfig from "./src/config/envConfig";
import connectDb from "./src/config/databaseConnection";
import server from "./src/server";
async function startServer() {
  const serverConf = {
    port: envConfig.port,
  };

  await connectDb();
  server.listen(serverConf.port || 5000, () => {
    console.log(`server is running on port: ${serverConf.port}`);
  });
}
startServer();
