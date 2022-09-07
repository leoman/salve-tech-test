import styles from './clinic.module.css'
import Link from 'next/link';
import { Clinic } from '../../types/clinic'

export const ClinicCard = ({ id, name }: Clinic) => (
  <Link href={`/clinics/${id}`} className={styles.card}>
    <div>
      <h2 className={styles.title}>{name}</h2>
      <p>Find in-depth information about patients of clinic {name}</p>
    </div>
  </Link>
)