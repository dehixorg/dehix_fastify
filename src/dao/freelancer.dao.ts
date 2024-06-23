import { Service } from 'fastify-decorators';
import { Model } from 'mongoose';
import { MongoClient } from '../clients';
import { BaseDAO } from '../common/base.dao';
import { IFreelancer } from '../models/freelancer.entity';

@Service()
export class FreelancerDAO extends BaseDAO {
  model: Model<IFreelancer>;

  constructor() {
    super();
    this.model = MongoClient.models.FreelancerModel as unknown as Model<IFreelancer>;
  }

  async getFreelancerByEmail(email: string) {
    return this.model.findOne({ email }) ;
  }

  async findOneByEmail(email: string) {
    return this.model.findOne(
      { email },
      'id password firebase_id full_name email is_email_verified owner_id'
    ) ;
  }

  async getById(id: string) {
    return this.model.findById(
      id,
      'id firebase_id full_name email is_email_verified owner_id'
    ) ;
  }

  async updateFreelancer(condition: any, newData: any) {
    return this.model.updateOne(condition, newData) ;
  }

  async findFreelancerById(id: string) {
    return this.model.findById(id) ;
  }

  async updateFreelancerData(id: string, update: any) {
    return this.model.updateOne({ _id: id }, update) ;
  }
  async findAllFreelancer(){
    return this.model.find();
  }
}
