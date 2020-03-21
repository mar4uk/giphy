export const handleError = (err, req, res, next) => {
  const {
    statusCode,
    message
  } = err;

  if (req.xhr) {
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message
    });
  } else {
    res.status(statusCode);
    res.render('error', { error: err });
  }
}