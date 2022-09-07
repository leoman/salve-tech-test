import type { GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import API from '../service'
import { Clinic } from '../types/clinic'
import { ClinicCard } from '../components/clinic'

interface Props {
  clinics: Clinic[]
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await API.getClinics()
    return {
      props: {
        clinics: response.result,
      },
    };
  } catch (error) {
    console.error(error)
    return {
      props: {
        clinics: [],
      },
    };
  }
}

const Home = ({ clinics }: Props) => {
  console.log(clinics);
  return (
    <div className={styles.container}>
      <Head>
        <title>Salve Tech Test</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Salve Tech test
        </h1>

        <p className={styles.description}>
          Please click on a clinic to see more information
        </p>

        <div className={styles.grid}>
          {clinics.map(({ id, name }) => (
            <ClinicCard
              key={id.toString()}
              id={id}
              name={name}
              />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home
