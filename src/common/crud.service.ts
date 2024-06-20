import { Service } from 'fastify-decorators';

@Service()
export default class CRUDService {
  //declare daos...

  async create({ daoRef, request }) {
    // persist in db
    const daoInstance = new daoRef();
    const data = daoInstance.create({ em: request.em, data: request.body });
    return data;
  }

  async getById({ daoRef, request }) {
    const daoInstance = new daoRef();
    const item = await daoInstance.getById({
      em: request.em,
      id: request.params.id,
    });
    return item;
  }

  async delete({ daoRef, request }) {
    const daoInstance = new daoRef();

    const item = await daoInstance.delete({
      em: request.em,
      id: request.params.id,
    });

    if (!item) return false;

    return true;
  }

  async update({ daoRef, request }) {
    const daoInstance = new daoRef();

    const exisitingRecord = await request.em.findOneOrFail(daoInstance, request.params.id);

    const item = await daoInstance.update({
      em: request.em,
      record: exisitingRecord,
      newData: request.body,
    });

    // Check if the post exists
    if (!item) {
      return null;
    }

    // Update key-value pairs in the entity
    Object.assign(item, request.body);

    // Persist changes to the database
    await request.em.flush();
    return item;
  }

  async getAll({ daoRef, request }) {
    const daoInstance = new daoRef();
    const items = daoInstance.getAll({ em: request.em });
    return items;
  }
}
