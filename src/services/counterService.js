import Counter from '../models/counterModel.js';

class CounterService {
  static async getNextSequence(entityName) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: `${entityName}Id` },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    return counter.seq.toString().padStart(3, '0');
  }
}

export default CounterService;
