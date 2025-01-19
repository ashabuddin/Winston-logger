const express = require("express");
const app = express();
const userRoute = require("./routes");
const logger = require("./utils/logger");
const correlationId = require("./middleware/setCorrelationId");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Winston Express Logger
const {
  expressWinstonErrorLogger,
  expressWinstonInfoLogger,
} = require("./middleware/winstonExpressLogger");

app.use(correlationId);
app.use(expressWinstonInfoLogger);
//Routes
app.use(userRoute);

app.use(expressWinstonErrorLogger);

//Global Error Handler
app.use((err, req, res, next) => {
  const errorObj = {
    message: err?.message || "something went wrong",
    correlationId:req.headers["x-correlation-id"],
    status: err?.status || 500,
  };
  logger.error(JSON.stringify(errorObj));
  res.status(errorObj.status).json(errorObj);
});

app.listen(4000, () => {
  console.log("http://localhost:4000");
});
