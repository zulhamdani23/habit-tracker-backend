const resVal = {}

resVal.success = (data = null) => ({
    code: "01",
    message: "success",
    data
  }),

resVal.failed = (data = null) => ({
    code: "02",
    message: "failed",
    data
  })

module.exports = resVal;