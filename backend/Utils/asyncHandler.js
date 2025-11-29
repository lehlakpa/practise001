const asunchandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        }
        catch (error) {
            const statuscode = res.statusCode === 200 ? 500 : res.statusCode;
            res.status(statuscode);
            res.json({
                message: error.message,
                stack: process.env.NODE_ENV === 'production' ? null : error.stack,
            });
        }
    };

}