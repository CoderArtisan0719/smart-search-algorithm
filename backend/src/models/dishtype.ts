import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index'; // Correct import

class DishType extends Model {
  public id!: number;
  public name!: string;
}

DishType.init({
  name: DataTypes.STRING,
}, { sequelize, modelName: 'DishType', tableName: 'DishTypes' });

export default DishType;
