

const errorHanding = (err, req, res, next) => {
    console.log(err);
    res.send({
      success: false,
      status :err.status || 500,
      stack: process.env.NODE_ENV,
      message: err.message || "Something went wrong",
  
    })
  };
  
  module.exports = errorHanding;
  