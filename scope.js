/**
 * scope.js
 * Defines an array of rsIds for the oAuth authentication with
 * 23andMe
 */
var COMT = [
// COMT
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
//DRD2
  "rs6278",
  "rs6279",
  "rs6276",
  "rs9282673",
  "rs1110977",
  "rs6277",
  "rs1801028",
  "rs1800496",
  "rs1076560",
  "rs2283265",
  "rs12363125",
  "rs2734839",
  "rs2734838",
  "rs2440390",
  "rs1800499",
  "rs1107162",
  "rs1079727",
  "rs2002453",
  "rs72393999",
  "rs2734836",
  "rs1800498",
  "rs2234690",
  "rs2075652",
  "rs4986918",
  "rs4986923",
  "rs1076563",
  "rs1079597",
  "rs1079596",
  "rs1125394",
  "rs2471857",
  "rs4436578",
  "rs17115583",
  "rs4620755",
  "rs11214606",
  "rs4648318",
  "rs4648319",
  "rs4379875",
  "rs12574471",
  "rs17529477",
  "rs4245146",
  "rs4936270",
  "rs4274224",
  "rs12805897",
  "rs4581480",
  "rs7131056",
  "rs4648317",
  "rs7117915",
  "rs4630328",
  "rs4350392",
  "rs4938019",
  "%20names",
  "%20basic"
]

// Export the array as a string joined by urlencoded space character
exports.COMTscope = COMT.join("%20");
