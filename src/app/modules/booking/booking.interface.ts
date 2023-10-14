export type IBookingFilterRequest = {
  date?: string | undefined;
  status?: string | undefined;
};

export const bookingSearchableFields: string[] = ['date', 'status'];

export const bookingFilterableFields: string[] = ['date', 'status'];
