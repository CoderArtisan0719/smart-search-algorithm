import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';

class Brand extends Model {
  public id!: number;
  public name!: string;
}

Brand.init({
  name: DataTypes.STRING,
}, { sequelize, modelName: 'Brand', tableName: 'Brands' });

export default Brand;
