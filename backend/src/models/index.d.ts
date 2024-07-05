import { Sequelize, Model, ModelCtor } from 'sequelize';
import City from './city';
import Brand from './brand';
import DishType from './dishtype';
import Diet from './diet';

export const sequelize: Sequelize;
export const City: ModelCtor<City>;
export const Brand: ModelCtor<Brand>;
export const DishType: ModelCtor<DishType>;
export const Diet: ModelCtor<Diet>;

const db: {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  City: ModelCtor<City>;
  Brand: ModelCtor<Brand>;
  DishType: ModelCtor<DishType>;
  Diet: ModelCtor<Diet>;
};

export default db;
