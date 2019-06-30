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
  for (let i = 0; i < metrics.length; i++){
    let computedResults = computeStatsForMetric(measurements, metrics[i], stats)
    for (let j = 0; j < computedResults.length; j++ ){
      data.push(computedResults[j])
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
function computeStatsForMetric(measurements, metric, stats){
  let firstMetric = metric
  let values = [];
  measurements.forEach((v, i) => {
    let value = measurements[i].getMetric(firstMetric)
    if (value != null){
      values.push(value)
    }
  });

  if (values.length <= 0){
    return [];
  }

  let statistics = [];
  for (let i = 0; i < stats.length; i++){
    let statMap = {}
    let computedStat
    statMap['metric'] = firstMetric
    statMap['stat'] = stats[i]
    switch (stats[i]){
      case 'min':
        computedStat = Math.min(...values)
        break;
      case 'max':
        computedStat = Math.max(...values)
        break;
      case 'average':
        computedStat = values.reduce((a,b) => a + b, 0)/values.length
    }
    
    statMap['value'] = Number(computedStat.toFixed(1))
    statistics.push(statMap);
  }
  return statistics
}
