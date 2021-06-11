const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");
const appRoot = require("app-root-path");
const process = require("process");

const logDir = `${appRoot}/logs`;

const {
    combine,
    timestamp,
    label,
    printf,
} = winston.format;

const logFormat = printf(
    ({ level, message, label, timestamp}) => {
        return `s${timestamp} [${label} ${level}: ${message}]`;
    });

const log = winston.createLogger({
    format : combine(
        label({
            label: "UahageProject"
        }),
        timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        logFormat // 로그 출력 포멧
    ),
    transports: [
        new winstonDaily({
            level: "info",
            datePattern: "YYYY-MM-DD",
            dirname: logDir,
            filenmae: "%DATE%.log",
            maxFiles: 30, // 30일치 로그 파일 저장
            zippedArchive: true
        }),
        new winstonDaily({
            level: "error",
            datePattern: "YYYY-MM-DD",
            dirname: logDir,
            filenmae: "%DATE%.error.log",
            maxFiles: 30, // 30일치 로그 파일 저장
            zippedArchive: true
        })
    ],
    exceptionHandlers: [
        new winstonDaily({
            level: "error",
            datePattern: "YYYY-MM-DD",
            dirname: logDir,
            filenmae: "%DATE%.exception.log",
            maxFiles: 30, // 30일치 로그 파일 저장
            zippedArchive: true
        })
    ]
});

if(process.env.APP_MODE !== "PROD"){
    log.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

module.exports = log; 