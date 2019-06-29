import { Measurement } from './measurement';
import { HttpError } from '../errors';

let data = []
/**
 * Add new measurement
 * @param {Measurement} measurement to be added
 */
export function add(measurement) {
  // show error checking on failure cases
  // define a simple data store -- in memory -- so fetch() can read and queryDateRange() can mutate
  let invalids = measurement.getInvalidMetrics();
  if (invalids.length > 0){
    throw new HttpError(400, invalids.toString())
  }
  throw new HttpError(501);
}

/**
 * Get existing measurement
 * @param {Date} timestamp when measurement was taken
 * @returns {Measurement} measurement for the particular date
 */
export function fetch(timestamp) {
  throw new HttpError(501);
}

/**
 * Get the measurements within the given date range
 * @param {Date} start Lower bound for the query, inclusive
 * @param {Date} end Upper bound for the query, exclusive
 */
export function queryDateRange(from, to) {
  throw new HttpError(501);
}
