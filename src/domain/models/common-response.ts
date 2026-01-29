export class ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
  path?: string;
  method?: string;
  duration?: string;

  constructor(
    success: boolean,
    message: string,
    data: T,
    path?: string,
    method?: string,
    duration?: string,
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.timestamp = new Date().toISOString();
    this.path = path;
    this.method = method;
    this.duration = duration;
  }

  static success<T>(
    data: T,
    message: string = 'Operation completed successfully',
    path?: string,
    method?: string,
    duration?: string,
  ): ApiResponse<T> {
    return new ApiResponse(true, message, data, path, method, duration);
  }

  static error<T>(
    message: string = 'Operation failed',
    data: T = null,
    path?: string,
    method?: string,
    duration?: string,
  ): ApiResponse<T> {
    return new ApiResponse(false, message, data, path, method, duration);
  }

  static created<T>(
    data: T,
    message: string = 'Resource created successfully',
    path?: string,
    method?: string,
    duration?: string,
  ): ApiResponse<T> {
    return new ApiResponse(true, message, data, path, method, duration);
  }

  static updated<T>(
    data: T,
    message: string = 'Resource updated successfully',
    path?: string,
    method?: string,
    duration?: string,
  ): ApiResponse<T> {
    return new ApiResponse(true, message, data, path, method, duration);
  }

  static deleted<T>(
    message: string = 'Resource deleted successfully',
    path?: string,
    method?: string,
    duration?: string,
  ): ApiResponse<T> {
    return new ApiResponse(true, message, null, path, method, duration);
  }

  static notFound<T>(
    message: string = 'Resource not found',
    path?: string,
    method?: string,
    duration?: string,
  ): ApiResponse<T> {
    return new ApiResponse(false, message, null, path, method, duration);
  }

  static unauthorized<T>(
    message: string = 'Unauthorized access',
    path?: string,
    method?: string,
    duration?: string,
  ): ApiResponse<T> {
    return new ApiResponse(false, message, null, path, method, duration);
  }

  static forbidden<T>(
    message: string = 'Access forbidden',
    path?: string,
    method?: string,
    duration?: string,
  ): ApiResponse<T> {
    return new ApiResponse(false, message, null, path, method, duration);
  }

  static badRequest<T>(
    message: string = 'Bad request',
    data: T = null,
    path?: string,
    method?: string,
    duration?: string,
  ): ApiResponse<T> {
    return new ApiResponse(false, message, data, path, method, duration);
  }

  static internalError<T>(
    message: string = 'Internal server error',
    path?: string,
    method?: string,
    duration?: string,
  ): ApiResponse<T> {
    return new ApiResponse(false, message, null, path, method, duration);
  }
}

export class PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  timestamp: string;
  path?: string;
  method?: string;
  duration?: string;

  constructor(
    data: T[],
    page: number,
    limit: number,
    total: number,
    message: string = 'Data retrieved successfully',
    path?: string,
    method?: string,
    duration?: string,
  ) {
    this.success = true;
    this.message = message;
    this.data = data;
    this.pagination = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    };
    this.timestamp = new Date().toISOString();
    this.path = path;
    this.method = method;
    this.duration = duration;
  }

  static create<T>(
    data: T[],
    page: number,
    limit: number,
    total: number,
    message?: string,
    path?: string,
    method?: string,
    duration?: string,
  ): PaginatedResponse<T> {
    return new PaginatedResponse(
      data,
      page,
      limit,
      total,
      message,
      path,
      method,
      duration,
    );
  }
}
