/**
 * scope.js
 * Defines an array of rsIds for the oAuth authentication with
 * 23andMe
 */
var COMT = [
  "rs737866",
  "rs737865",
  "rs737864",
  "rs9332316",
  "rs1544325",
  "rs174675",
  "rs5993882",
  "rs5993883",
  "rs7290221",
  "rs4646312",
  "rs35919169",
  "rs5748492",
  "rs34686565",
  "rs165656",
  "rs165722",
  "rs6269",
  "rs6270",
  "rs4633",
  "rs6267",
  "rs740602",
  "rs2239393",
  "rs740601",
  "rs769223",
  "rs4680",
  "rs769224",
  "rs165631",
  "rs4646316",
  "rs165774",
  "rs174696",
  "rs174699",
  "rs9306235",
  "rs9332377",
  "rs14968",
  "rs11544667",
  "rs165599",
  "rs165728",
  "%20basic",
  "%20names"
]

// Export the array as a string joined by urlencoded space character
exports.COMTscope = COMT.join("%20");
