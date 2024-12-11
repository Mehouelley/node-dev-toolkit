import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

export interface Request extends ExpressRequest {
  // Add custom properties here if needed
}

export interface Response extends ExpressResponse {
  // Add custom properties here if needed
}