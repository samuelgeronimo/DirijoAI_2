// Structured logging utility
// Fixes: Console.log in production (Issue #8)

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
    [key: string]: unknown;
}

class Logger {
    private isDevelopment = process.env.NODE_ENV === 'development';

    private log(level: LogLevel, message: string, context?: LogContext) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level,
            message,
            ...context
        };

        // In development, use console for readability
        if (this.isDevelopment) {
            const emoji = {
                info: 'ℹ️',
                warn: '⚠️',
                error: '❌',
                debug: '🔍'
            }[level];

            console.log(`${emoji} [${level.toUpperCase()}] ${message}`, context || '');
        } else {
            // In production, output structured JSON for log aggregation
            console.log(JSON.stringify(logEntry));
        }
    }

    info(message: string, context?: LogContext) {
        this.log('info', message, context);
    }

    warn(message: string, context?: LogContext) {
        this.log('warn', message, context);
    }

    error(message: string, context?: LogContext) {
        this.log('error', message, context);
    }

    debug(message: string, context?: LogContext) {
        if (this.isDevelopment) {
            this.log('debug', message, context);
        }
    }
}

export const logger = new Logger();
