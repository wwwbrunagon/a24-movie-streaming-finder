import { Request, Response, NextFunction } from 'express';
import { errorHandlerMiddleware } from './../../middleware/errorHandlerMiddleware';
import { CustomError } from './../../errors/CustomError';

describe('errorHandlerMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    // Mock request and response
    req = {
      method: 'GET',
      url: '/test',
    };

    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    res = {
      status: statusMock,
    };

    next = jest.fn();

    // Clear mocks
    jest.clearAllMocks();
  });

  beforeAll(() => {
    // Mock console.error for all tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    // Restore original console.error after tests
    jest.restoreAllMocks();
  });

  it('should log the correct error details', () => {
    const error = new Error('Something went wrong');
    const statusCode = 500;
    const message = 'Internal Server Error';

    errorHandlerMiddleware(error, req as Request, res as Response, next);

    const expectedLogMessage = `${statusCode} - ${req.method} ${req.url}: ${message}`;

    expect(console.error).toHaveBeenCalledWith(expectedLogMessage);
  });
});
