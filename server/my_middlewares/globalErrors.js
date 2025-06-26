const globalErrors = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "erreur";

    if(process.env.NODE_ENV === "development") {
        errorDevMode(err, res);
    }else {
        errorProdMode(err, res);
    }
}

const errorDevMode = (err, res) => {
    return (res.status(err.statusCode).json({
        statusCode: err.statusCode,
        status: err.status,
        message: err.message,
        stack: err.stack
    })); 
}

const errorProdMode = (err, res) => {
    return (res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    }));
}

module.exports = globalErrors;