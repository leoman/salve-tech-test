import { Handler } from 'aws-lambda';
import { getCSVData } from '../utils'
import { MessageUtil } from '../utils/message'
import { Clinic } from '../types/clinic';

export const handler: Handler = async () => {
  try {
    const records = await getCSVData<Clinic[]>('clinics.csv');
    return MessageUtil.success<Clinic[]>(records);
  } catch (err: any) {
    console.error(err);
    return MessageUtil.error(err.code, err.message);
  }
}
