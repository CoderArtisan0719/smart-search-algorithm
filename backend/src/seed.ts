import seedTable from './utils/seedHelpers';
import City from './models/city';
import Brand from './models/brand';
import DishType from './models/dishtype';
import Diet from './models/diet';
import dataConfig from './utils/dataConfig';
import db from './models';

const seedDatabase = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connected');

    await seedTable(City, dataConfig.City);
    await seedTable(Brand, dataConfig.Brand);
    await seedTable(DishType, dataConfig.DishType);
    await seedTable(Diet, dataConfig.Diet);

    console.log('Database seeded');
    await db.sequelize.close();
  } catch (error) {
    console.error('Failed to seed database:', error);
  }
};

seedDatabase();
