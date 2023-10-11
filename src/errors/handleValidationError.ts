import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleValidationError = (error: any): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
    {
      path: '',
      message: 'message,',
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleValidationError;
