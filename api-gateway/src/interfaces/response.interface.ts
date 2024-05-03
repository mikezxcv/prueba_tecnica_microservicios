interface SuccessResponse<T> {
    success: true;
    url?: string; // URL opcional para redirecciones
    timestamp?: string; // Fecha y hora de la respuesta
    data: T;
    message?: string; // Mensaje opcional para respuestas exitosas
  }
  
  interface ErrorResponse {
    success: false;
    error: {
      code: number;
      message: string;
      details?: any;
    };
  }
  
  // Por ejemplo, una respuesta de lista paginada podría tener propiedades adicionales
  interface PaginatedResponse<T> extends SuccessResponse<T[]> {
    totalCount: number; // Total de elementos en la lista completa
    currentPage: number; // Página actual
    pageSize: number; // Tamaño de página
  }
  
  // Otra posibilidad es tener una respuesta genérica para errores de validación
  interface ValidationErrorResponse extends ErrorResponse {
    error: {
      code: number;
      message: string;
      details: { [field: string]: string[] }; // Detalles de validación por campo
    };
  }
  