export function errorHandler(err, req, res, next) {
    const status = err.status || 500
    const response = { message: err.message || 'Internal server error' }

    if (err.remainingAttempts !== undefined) {
        response.message = `${response.message}. ${err.remainingAttempts} attempts remaining.`
        response.remainingAttempts = err.remainingAttempts
    }

    res.status(status).json(response)
}