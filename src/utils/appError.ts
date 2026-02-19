// -------------------------------------------------
// Custom Application Error
// -------------------------------------------------
// Why a custom error class?
// Native Error has no `statusCode`. We need to
// differentiate between a 400 (client mistake)
// and a 500 (our bug) when the error reaches
// the global error handler.
// -------------------------------------------------

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: number = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        // Maintain correct prototype chain (TypeScript quirk with extending Error)
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
