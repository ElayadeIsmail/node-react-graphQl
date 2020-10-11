const { dateToString } = require('../../helpers/date');
const Event = require('../../models/event');
const Booking = require('../../models/booking');

const transformBooking = (booking) => {
  return {
    ...booking._doc,
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
  };
};

module.exports = {
  bookings: async () => {
    try {
      const bookings = await Booking.find({});
      return bookings.map((booking) => {
        return transformBooking(booking);
      });
    } catch (error) {
      throw error;
    }
  },
  bookEvent: async (args) => {
    const event = await Event.findById(args.eventId);
    const booking = new Booking({
      user: '5f81b3ced2abb4058a9f5a9d',
      event,
    });
    const res = await booking.save();
    return transformBooking(res);
  },
  cancelBooking: async (args) => {
    try {
      const booking = await Booking.findById(args.bookingId);
      await Booking.deleteOne({ _id: args.bookingId });
      return transformEvent(booking.event);
    } catch (error) {
      throw error;
    }
  },
};
