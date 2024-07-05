import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index'; // Correct import

class Diet extends Model {
  public id!: number;
  public name!: string;
}

Diet.init({
  name: DataTypes.STRING,
}, { sequelize, modelName: 'Diet', tableName: 'Diets' });

export default Diet;