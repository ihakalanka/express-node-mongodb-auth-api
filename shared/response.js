exports.successResponse = (res, msg, data) => {
    return res.status(200).json({
        status: 200,
        message: msg,
        data: data
    });
}

exports.errorResponse = (res, status, msg, data) => {
    return res.status(status || 400).json({
        status: status || 400,
        message: msg || 'Something went wrong!',
        data: data
    })
}