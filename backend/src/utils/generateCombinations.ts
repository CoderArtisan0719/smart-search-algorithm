import { Entity, Entities } from '../types/entities';

export const generateCombinations = (entities: Entities): { [key: string]: Entity }[] => {
  const results: { [key: string]: Entity }[] = [];
  const keys = Object.keys(entities) as (keyof Entities)[];

  const combine = (current: { [key: string]: Entity }, index: number) => {
    if (index === keys.length) {
      results.push(current);
      return;
    }

    const key = keys[index];
    const entityList = entities[key];

    if (entityList.length === 0) {
      combine(current, index + 1);
    } else {
      entityList.forEach(entity => {
        combine({ ...current, [key.slice(0, -1)]: entity }, index + 1);
      });
    }
  };

  combine({}, 0);
  return results;
};
