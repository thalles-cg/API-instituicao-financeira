import Counter from '../models/counterModel.js';

class CounterService {
  static async getNextSequence(entityName, options = {}) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: `${entityName}Id` },
      { $inc: { seq: 1 } },
      { new: true, upsert: true, session: options.session }
    );

    return counter.seq.toString().padStart(3, '0');
  }
}

export default CounterService;