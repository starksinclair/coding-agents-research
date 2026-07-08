/**
 * LCB-01 — Number of Senior Citizens
 * @param {string[]} details
 * @return {number}
 */
function countSeniors(details) {
  return details.filter((d) => parseInt(d.slice(11, 13), 10) > 60).length;
}

module.exports = { countSeniors };
