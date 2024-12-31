module.exports.returnResponseJson = function (msg, status = 400, data = undefined) {
    return { msg, status, data };
  };