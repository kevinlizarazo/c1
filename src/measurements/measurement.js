/**
 * @property {Date} timestamp
 */
export class Measurement {
  constructor() {
    /** @private */
    this.metrics = new Map();
  }

  /**
   * @param {String} name
   * @param {Number} value
   */
  setMetric(name, value) {
    this.metrics.set(name, value);
  }

  /**
   * @param {String} name
   * @return {Number}
   */
  getMetric(name) {
    return this.metrics.get(name);
  }

  getInvalidMetrics() {
    let invalidKeys = []
    let keys = this.metrics.keys
    for (let i = 0; i < keys.length; i++){
      let value = this.metrics.get(keys[i])
      if (!isFloat(value)) {
        invalidKeys.push(keys[i])
      }
    }
    return invalidKeys;
  }

}
