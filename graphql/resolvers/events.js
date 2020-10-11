const { dateToString } = require('../../helpers/date');
const User = require('../../models/user');
const Event = require('../../models/event');

const transformEvent = (event) => {
  return {
    ...event._doc,
    _id: event._id,
    date: dateToString(event._doc.date),
  };
};

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        console.log(event);
        return transformEvent(event);
      });
    } catch (error) {
      throw error;
    }
  },
  createEvent: async (args) => {
    try {
      const user = await User.findById('5f81b3ced2abb4058a9f5a9d');
      const event = new Event({
        title: args.eventInput.title,
        descreption: args.eventInput.descreption,
        price: parseFloat(args.eventInput.price),
        date: new Date(args.eventInput.date),
        creator: '5f81b3ced2abb4058a9f5a9d',
      });
      await event.save();
      user.createdEvents.push(event);
      await user.save();
      return transformEvent(event);
    } catch (error) {
      console.log(err);
      throw err;
    }
  },
};
