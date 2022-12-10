exports.success = (req, res, message, status) =>{
    const statusCode = status || 200
    const statusMessage = message || ""
    res.status(statusCode).send({
        error: false,
        status:statusCode,
        body: statusMessage,
    })
}

exports.error = (req, res, err, status) =>{
    const statusCode = status || 500
    const statusMessage = err || "Internal server error"
    res.status(statusCode).send({
        error: true,
        status:statusCode,
        body: statusMessage,
    })
}