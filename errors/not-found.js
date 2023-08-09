import {StatusCodes} from 'http-status-codes';
import { CustomAPIError } from '../errors/custom-api.js';

export class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

