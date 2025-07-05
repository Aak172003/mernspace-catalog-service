import winston from "winston";
import { ConfigVariables } from ".";

const logger = winston.createLogger({
    // This level is default,
    // like when i forget to add level, so below tranport inherit this level inside

    // Main level
    level: "info",
    defaultMeta: {
        // log for which serviceName
        serviceName: "catalog-service",
    },

    // If i set format here , it work as globallly , for all type of transport
    // This combine keyword is used to apply more than 2 formats

    format: winston.format.combine(
        // This is used to add timestamp in log
        winston.format.timestamp(),
        winston.format.json(),
    ),

    // Transport -> means where we want to store logs inside database transport , file transport etc
    // Transport -> basically a storage of logs

    // if we don't give level , so it take level of parent , but if we give so it work on own define logger level
    transports: [
        new winston.transports.File({
            dirname: "logs",
            filename: "combined.log",

            level: "silly",
            // if silent true , then no console logs create Which means silent is true  in test mode
            silent: ConfigVariables.NODE_ENV === "test",
        }),

        new winston.transports.File({
            dirname: "logs",
            filename: "info.log",

            level: "info",
        }),

        new winston.transports.File({
            dirname: "logs",
            filename: "error.log",
            level: "error",
        }),

        // This is for console logs
        new winston.transports.Console({
            level: "debug",
            // I commented this formet because i set format globally which means all tarnsport will follow root format
            // format: winston.format.json(),
        }),
    ],
});

export default logger;
