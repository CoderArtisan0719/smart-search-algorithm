export type EntityType = 'cities' | 'brands' | 'dish_types' | 'diets';
export type Entity = { id: number, name: string };
export type Entities = { [key in EntityType]: Entity[] };