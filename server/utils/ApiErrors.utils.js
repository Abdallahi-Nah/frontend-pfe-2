class ApiErrors extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith(4) ? 'echoue':'erreur';
        this.isOperational = true;
    }
}

module.exports = ApiErrors;