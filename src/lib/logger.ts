type LogLevel = "info" | "warn" | "error";
type LogContext = Record<string, unknown>;

const SENSITIVE_KEY_PATTERN = /email|name|dietary|password|token|subject|body|cookie|authorization/i;
const MAX_DEPTH = 4;

function sanitizeValue(value: unknown, depth = 0): unknown {
  if (depth >= MAX_DEPTH) {
    return "[Truncated]";
  }

  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item, depth + 1));
  }

  if (typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).reduce<Record<string, unknown>>((acc, [key, val]) => {
      acc[key] = SENSITIVE_KEY_PATTERN.test(key) ? "[Redacted]" : sanitizeValue(val, depth + 1);
      return acc;
    }, {});
  }

  return String(value);
}

function serializeError(error: unknown): Record<string, unknown> {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return {
    message: typeof error === "string" ? error : "Unknown error",
  };
}

function writeLog(level: LogLevel, event: string, context?: LogContext, error?: unknown) {
  const payload: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    level,
    event,
  };

  if (context) {
    payload.context = sanitizeValue(context);
  }

  if (error !== undefined) {
    payload.error = sanitizeValue(serializeError(error));
  }

  const line = JSON.stringify(payload);

  if (level === "info") {
    console.log(line);
    return;
  }

  if (level === "warn") {
    console.warn(line);
    return;
  }

  console.error(line);
}

export const logger = {
  info(event: string, context?: LogContext) {
    writeLog("info", event, context);
  },
  warn(event: string, context?: LogContext) {
    writeLog("warn", event, context);
  },
  error(event: string, context?: LogContext, error?: unknown) {
    writeLog("error", event, context, error);
  },
};
