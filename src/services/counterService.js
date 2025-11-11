import Counter from '../models/counterModel.js';

class CounterService {
  static async getNextSequence(entityName, options = {}) {
    const id = `${entityName}Id`;

    const counter = await Counter.findByIdAndUpdate(
      id,
      { $inc: { seq: 1 } },
      { new: true, upsert: true, session: options.session }
    );

    if (!counter || typeof counter.seq !== 'number') {
      console.error(`❌ Falha ao atualizar contador para "${entityName}". Retorno inválido:`, counter);
      throw new Error(`CounterService: falha ao gerar sequência para "${entityName}".`);
    }

    return counter.seq.toString().padStart(3, '0');
  }
}

export default CounterService;