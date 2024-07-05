import path from 'path';

const dataConfig: { [key: string]: string } = {
  City: path.join(__dirname, '../data/cities-v2.xlsx'),
  Brand: path.join(__dirname, '../data/brands-v2.xlsx'),
  DishType: path.join(__dirname, '../data/dish-types-v2.xlsx'),
  Diet: path.join(__dirname, '../data/diets-v2.xlsx'),
};

export default dataConfig;
