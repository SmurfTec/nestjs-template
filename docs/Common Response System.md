# Common Response System

This directory contains the common response system for the application, providing standardized API responses across all controllers.

## Components

### 1. Domain Models (`src/domain/models/common-response.ts`)

- **`ApiResponse<T>`**: Base response class with success/error handling
- **`PaginatedResponse<T>`**: Specialized response for paginated data

### 2. DTOs (`src/infrastructure/controllers/common/response.dto.ts`)

Swagger documentation DTOs for API responses:
- `ApiResponseDto<T>`
- `PaginatedResponseDto<T>`
- Various example response DTOs (Success, Error, Created, etc.)

### 3. Service (`src/infrastructure/common/services/response.service.ts`)

Helper service for creating standardized responses in controllers.

### 4. Interceptors

Updated interceptors that automatically wrap responses in the common format:
- `ResponseInterceptor`: Basic response formatting
- `TranformerInterceptor`: Data transformation with response formatting

## Usage

### In Controllers

```typescript
import { ResponseService } from '../../common/services/response.service';
import {
  ApiResponseDto,
  SuccessResponseDto,
  CreatedResponseDto,
  // ... other DTOs
} from './response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly responseService: ResponseService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @SwaggerApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
    type: SuccessResponseDto,
  })
  async getUsers() {
    const users = await this.userUseCases.getUsers();
    return this.responseService.success(users, 'Users retrieved successfully');
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @SwaggerApiResponse({
    status: 201,
    description: 'User created successfully',
    type: CreatedResponseDto,
  })
  async createUser(@Body() userDto: CreateUserDto) {
    const user = await this.userUseCases.createUser(userDto);
    return this.responseService.created(user, 'User created successfully');
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @SwaggerApiResponse({
    status: 200,
    description: 'User deleted successfully',
    type: DeletedResponseDto,
  })
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userUseCases.deleteUser(id);
    return this.responseService.deleted('User deleted successfully');
  }
}
```

### Error Handling

```typescript
@Get(':id')
async getUser(@Param('id', ParseIntPipe) id: number) {
  try {
    const user = await this.userUseCases.getUser(id);
    if (!user) {
      throw new HttpException(
        this.responseService.notFound('User not found'),
        HttpStatus.NOT_FOUND,
      );
    }
    return this.responseService.success(user, 'User retrieved successfully');
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new HttpException(
      this.responseService.internalError('Failed to retrieve user'),
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
```

### Paginated Responses

```typescript
@Get()
async getUsers(
  @Query('page', ParseIntPipe) page: number = 1,
  @Query('limit', ParseIntPipe) limit: number = 10,
) {
  const { data, total } = await this.userUseCases.getUsers(page, limit);
  return this.responseService.paginated(data, page, limit, total);
}
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { /* your data */ },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/users",
  "method": "GET",
  "duration": "150ms"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Resource not found",
  "data": null,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/users/999",
  "method": "GET",
  "duration": "50ms"
}
```

### Paginated Response
```json
{
  "success": true,
  "message": "Data retrieved successfully",
  "data": [/* array of items */],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasNext": true,
    "hasPrev": false
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/users",
  "method": "GET",
  "duration": "200ms"
}
```

## Available Response Methods

- `success(data, message?)` - General success response
- `created(data, message?)` - Resource creation response
- `updated(data, message?)` - Resource update response
- `deleted(message?)` - Resource deletion response
- `notFound(message?)` - Resource not found response
- `unauthorized(message?)` - Unauthorized access response
- `forbidden(message?)` - Access forbidden response
- `badRequest(message?, data?)` - Bad request response
- `internalError(message?)` - Internal server error response
- `paginated(data, page, limit, total, message?)` - Paginated data response

## Migration Guide

To migrate existing controllers:

1. Import the `ResponseService`
2. Replace direct returns with `responseService` method calls
3. Add proper Swagger documentation using the response DTOs
4. Update error handling to use the standardized responses

## Benefits

- **Consistency**: All APIs return the same response format
- **Documentation**: Automatic Swagger documentation
- **Type Safety**: TypeScript support with generics
- **Error Handling**: Standardized error responses
- **Pagination**: Built-in pagination support
- **Timing**: Automatic request duration tracking
- **Metadata**: Request path and method included
