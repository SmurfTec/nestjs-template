import { Injectable } from '@nestjs/common';
import { ApiResponse, PaginatedResponse } from '../../../domain/models/common-response';

@Injectable()
export class ResponseService {
  success<T>(
    data: T,
    message: string = 'Operation completed successfully',
  ): ApiResponse<T> {
    return ApiResponse.success(data, message);
  }

  created<T>(
    data: T,
    message: string = 'Resource created successfully',
  ): ApiResponse<T> {
    return ApiResponse.created(data, message);
  }

  updated<T>(
    data: T,
    message: string = 'Resource updated successfully',
  ): ApiResponse<T> {
    return ApiResponse.updated(data, message);
  }

  deleted<T>(
    message: string = 'Resource deleted successfully',
  ): ApiResponse<T> {
    return ApiResponse.deleted(message);
  }

  notFound<T>(
    message: string = 'Resource not found',
  ): ApiResponse<T> {
    return ApiResponse.notFound(message);
  }

  unauthorized<T>(
    message: string = 'Unauthorized access',
  ): ApiResponse<T> {
    return ApiResponse.unauthorized(message);
  }

  forbidden<T>(
    message: string = 'Access forbidden',
  ): ApiResponse<T> {
    return ApiResponse.forbidden(message);
  }

  badRequest<T>(
    message: string = 'Bad request',
    data: T = null,
  ): ApiResponse<T> {
    return ApiResponse.badRequest(message, data);
  }

  internalError<T>(
    message: string = 'Internal server error',
  ): ApiResponse<T> {
    return ApiResponse.internalError(message);
  }

  paginated<T>(
    data: T[],
    page: number,
    limit: number,
    total: number,
    message: string = 'Data retrieved successfully',
  ): PaginatedResponse<T> {
    return PaginatedResponse.create(data, page, limit, total, message);
  }
}
