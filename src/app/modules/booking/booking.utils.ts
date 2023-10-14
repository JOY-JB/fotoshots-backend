import prisma from '../../../shared/prisma';

const checkAvailability = async (
  serviceId: string,
  date: Date,
  startTime: Date,
  endTime: Date
): Promise<boolean> => {
  const existingBookings = await prisma.booking.findMany({
    where: {
      serviceId,
      date: {
        equals: date,
      },
      startTime: {
        lte: endTime,
      },
      endTime: {
        gte: startTime,
      },
    },
  });

  return existingBookings.length === 0;
};

export const bookingUtils = {
  checkAvailability,
};
