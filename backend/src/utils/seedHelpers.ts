import XLSX from 'xlsx';
import { ModelCtor, Model } from 'sequelize';

interface DataRow {
  name: string;
}

const seedTable = async (Model: ModelCtor<Model>, filePath: string): Promise<void> => {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const data: DataRow[] = XLSX.utils.sheet_to_json<DataRow>(workbook.Sheets[sheetName]);

  const formattedData = data.map(item => ({
    name: item.name,
  }));

  await Model.bulkCreate(formattedData);
  console.log(`Data seeded for model ${Model.name}`);
};

export default seedTable;


