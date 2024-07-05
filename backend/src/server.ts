import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Sequelize, Model, DataTypes } from 'sequelize';
import { EntityType, Entity, Entities } from './types/entities';
import { QueryTypes } from 'sequelize';
import { generateCombinations } from './utils/generateCombinations';

// Database connection
const sequelize = new Sequelize('postgres', 'postgres', 'admin', {
  host: '127.0.0.1',
  dialect: 'postgres',
});

class City extends Model {
  public id!: number;
  public name!: string;
}
City.init({
  name: DataTypes.STRING,
}, { sequelize, modelName: 'City', tableName: 'Cities' });

class Brand extends Model {
  public id!: number;
  public name!: string;
}
Brand.init({
  name: DataTypes.STRING,
}, { sequelize, modelName: 'Brand', tableName: 'Brands' });

class DishType extends Model {
  public id!: number;
  public name!: string;
}
DishType.init({
  name: DataTypes.STRING,
}, { sequelize, modelName: 'DishType', tableName: 'DishTypes' });

class Diet extends Model {
  public id!: number;
  public name!: string;
}
Diet.init({
  name: DataTypes.STRING,
}, { sequelize, modelName: 'Diet', tableName: 'Diets' });

const app = express();
app.use(bodyParser.json());
app.use(cors());

const entityModels = {
  cities: City,
  brands: Brand,
  dish_types: DishType,
  diets: Diet,
};

async function extractEntities(searchTerm: string): Promise<{ [key: string]: Entity }[]> {
  const entities: Entities = { cities: [], brands: [], dish_types: [], diets: [] };

  // Split the search term on "in" and process parts separately
  const parts = searchTerm.split(/\bin\b/i);
  const primaryTerms = parts[0].trim().match(/(".*?"|[^"\s]+)/g) || [];
  const locationTerms = parts[1] ? parts[1].trim().split(/\s*or\s*|\s+/).filter(word => word) : [];

  const processWords = async (words: string[], entityType: EntityType, Model: typeof City) => {
    for (const word of words) {
      const entityMatches = await sequelize.query(
        `SELECT "id", "name" FROM "${Model.tableName}" WHERE "name" ILIKE :searchTerm`,
        {
          replacements: { searchTerm: `%${word}%` },
          type: QueryTypes.SELECT,
        }
      );
      const matches = entityMatches.map((e: any) => ({ id: e.id, name: e.name }));
      if (matches.length > 0) {
        entities[entityType].push(...matches);
      }
    }
  };

  // Process primary terms
  for (const [entityType, Model] of Object.entries(entityModels) as [EntityType, typeof City][]) {
    await processWords(primaryTerms, entityType, Model);
  }

  // Process location terms separately for cities
  await processWords(locationTerms, 'cities', City);

  // Remove duplicates within each entity type
  for (const key in entities) {
    entities[key as EntityType] = Array.from(new Set(entities[key as EntityType].map(e => JSON.stringify(e))))
      .map(e => JSON.parse(e));
  }

  return generateCombinations(entities);
}

app.get('/extractEntities', async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const combinations = await extractEntities(searchTerm);
    console.log(combinations, 'test')
    res.json(combinations);
  } catch (error: any) {
    console.error('Failed to extract entities:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
