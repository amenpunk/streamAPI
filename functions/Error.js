class ErrorHandler extends Error {
    constructor(code, message) {
        super();
        this.code = code;
        this.message = message;
    }
}
const handleError = (err, res) => {
    const { code, message } = err;
    return res.status(code).json({
        title: "Error",
        status: 0,
        message
    });
};

module.exports = {
    ErrorHandler,
    handleError
};
