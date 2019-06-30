import { HttpError } from '../errors';
import { Measurement } from '../measurements/measurement';

/**
 * Compute statistics for given measurements
 * @param {Measurement[]} measurements
 * @param {String[]} metrics
 * @param {String[]} stats
 * @return {*}
 */
export function computeStats(measurements, metrics, stats) {
  let data = [];
  for (let metric in metrics){
    for (let stat in computeStats(measurements, metric, stats)){
      data.push(stat)
    }
  }
  return data;
}
/**
 * Compute statistics for given measurements
 * @param {Measurement[]} measurements
 * @param {String} metric
 * @param {String[]} stats
 * @return {*}
 */
function computeStats(measurements, metric, stats){

  let values = new Array();
  for (let measurement in measurements){
    let value = measurement.getMetric(metric)
    if (value != null){
      values.push(value)
    }
  }

  let statistics = [];
  for (let stat in stats){
    let statMap = new Map();
    let computedStat
    statMap.set('metric', metric)
    statMap.set('stat', stat)
    switch (stat){
      case 'min':
        computedStat = Math.min(values)
      case 'max':
        computedStat = Math.max(values)
      case 'average':
        computedStat = (values.reduce((a,b) => a + b, 0)/values.length)
    }
    statMap.set('value', computedStat)
    statistics.push(statMap);
  }

  return statistics

}
