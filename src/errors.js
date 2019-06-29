import { STATUS_CODES } from 'http';
import { timingSafeEqual } from 'crypto';

export class HttpError extends Error {
  constructor(status, message) {
    super(STATUS_CODES[status]);
    this.status = status;
    this.message = message;
  }
}
