import { useState, useEffect } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Clinic } from '../../types/clinic'
import { Patient } from '../../types/patient'
import styles from '../../styles/Home.module.css'
import API from '../../service'
import { Patients } from '../../components/patients'
import { orderByString, orderByDate, orderByNumber } from '../../utils/order'

interface Props {
  clinic: Clinic
  patients: Patient[]
}

enum Direction {
  ASC,
  DESC
}

export const getStaticProps: GetStaticProps = async (context) => {
  const clinicId = Number(context?.params?.id)
  const clinics = await API.getClinics()
  const patients = await API.getPatients(clinicId);

  const clinic = clinics.result.find(({ id }) => Number(id) === clinicId)

  return {
    props: { 
      clinic,
      patients: patients.result,
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const clinics = await API.getClinics()

  const paths = clinics.result.map(({ id }) => ({
    params: {
      id: id.toString()
    }
  }))

  return {
    paths,
    fallback: false,
  };
}

const tableHeaders = (patients: Patient[]): string[]  => Object.keys(patients[0])

const capitaliseAndReplace = (header: string): string => {
  const word = header.replaceAll('_', ' ')
  return word[0].toUpperCase() + word.substring(1).toLowerCase();
}

const orderData = (patients: Patient[], key: string, direction: Direction): Patient[]  => {

  switch (key) {
    case 'id': {
      return orderByNumber(patients, 'id', direction !== Direction.ASC)
    }
    case 'first_name': {
      return orderByString(patients, 'first_name', direction !== Direction.ASC)
    }
    case 'last_name': {
      return orderByString(patients, 'last_name', direction !== Direction.ASC)
    }
    case 'date_of_birth': {
      return orderByDate(patients, 'date_of_birth', direction !== Direction.ASC)
    }
    default: {
      return patients;
    }
  }
}

const ClinicPage = ({ clinic, patients }: Props) => {

  const headers = tableHeaders(patients);
  const [orderKey, setOrderKey] = useState<string>(headers[0])
  const [direction, setDirection] = useState<Direction>(Direction.ASC)
  const [orderedPatients, setOrderedPatients] = useState<Patient[]>([])

  const orderDataBy = (key: string) => {
    if (key === orderKey) {
      setDirection(direction === Direction.ASC ? Direction.DESC : Direction.ASC)
      setOrderKey(key);
    } else {
      setDirection(Direction.ASC)
      setOrderKey(key);
    }
  }

  useEffect(() => {
    const data = orderData(patients, orderKey, direction);
    setOrderedPatients([...data])
  }, [patients, orderKey, direction])

  return (
    <div className={styles.container}>
      <Head>
        <title>Salve Tech Test</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Clinic: {clinic.name}
        </h1>

        <p className={styles.description}>
          <Link href="/">Back to home</Link>
        </p>

        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th onClick={() => orderDataBy(header)} key={header}>{capitaliseAndReplace(header)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <Patients
              patients={orderedPatients}
            />
          </tbody>
        </table>
      </main>
    </div>
  )
}

export default ClinicPage