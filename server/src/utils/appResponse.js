function AppResponse(res, status, message, data) {
  return res.status(res.statusCode).json({
    status: status.toString().startsWith('2') ? 'success' : 'error',
    message: message,
    data: data,
  });
}

export default AppResponse;
