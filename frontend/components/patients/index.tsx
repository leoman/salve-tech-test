import { Patient } from '../../types/patient'
interface Props {
  patients: Patient[]
}

export const Patients = ({ patients }: Props) => {
  return (
    <>
      {patients.map((patient) => (
        <tr key={patient.id}>
            {Object.entries(patient).map(([ key, value ]) => (
              <td key={`${key}-${value}`}>{value}</td>
            ))}
          </tr>
        )
      )}
    </>
  )
}