import { Measurement } from './measurement';
import { HttpError } from '../errors';

let data = new Map();
/**
 * Add new measurement
 * @param {Measurement} measurement to be added
 */
export function add(measurement) {
  let invalids = measurement.getInvalidMetrics();
  if (invalids.length > 0){
    throw new HttpError(400, invalids.toString())
  }
  data.set(measurement.timestamp.toISOString(), measurement)
}

/**
 * Get existing measurement
 * @param {Date} timestamp when measurement was taken
 * @returns {Measurement} measurement for the particular date
 */
export function fetch(timestamp) {
  if (data.has(timestamp.toISOString())){
    return data.get(timestamp.toISOString())
  }
  return null
}

/**
 * Get the measurements within the given date range
 * @param {Date} start Lower bound for the query, inclusive
 * @param {Date} end Upper bound for the query, exclusive
 */
export function queryDateRange(from, to) {
  let measurementsRange = [];
  for (key in data.keys){
    let keyDate = new Date(key)
    if (keyDate >= from && keyDate < to){
      measurementsRange.push(data[key])
    }
  }
  return measurementsRange;

}

