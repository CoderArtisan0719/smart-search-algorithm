import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index'; // Correct import

class City extends Model {
  public id!: number;
  public name!: string;
}

City.init({
  name: DataTypes.STRING,
}, { sequelize, modelName: 'City', tableName: 'Cities' });

export default City;

