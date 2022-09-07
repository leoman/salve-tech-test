import { Patient } from '../../types/patient'
import { useState, useEffect } from 'react'

interface Props {
  patients: Patient[]
}

export const Patients = ({ patients }: Props) => {

  // console.log('patients', patients)

  useEffect(() => {
    console.log('patients has updated!!!')
  }, [patients])


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