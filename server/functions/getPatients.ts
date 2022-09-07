
import { Handler, APIGatewayEvent } from 'aws-lambda';
import { getCSVData } from '../utils'
import { MessageUtil } from '../utils/message'
import { Patient } from '../types/patient';

const patientsLookup: { [key: string]: string; } = {
  '1': 'patients-1.csv',
  '2': 'patients-2.csv',
}

export const handler: Handler = async (event: APIGatewayEvent) => {

  const id = event?.pathParameters?.id;

  if (!id) {
    return MessageUtil.error(400, 'No clinic ID provided');
  }

  const clinicFile = patientsLookup[id];

  if (!clinicFile) {
    return MessageUtil.error(404, `No clinic found for id: ${id} provided`);
  }

  try {
    const records = await getCSVData<Patient[]>(clinicFile);
    return MessageUtil.success<Patient[]>(records);
  } catch (err: any) {
    console.error(err);
    return MessageUtil.error(err.code, err.message);
  }
}
