import { notify } from '@/lib/ToastNotification'
import { CheckCircleIcon } from '@heroicons/react/16/solid'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Select, { type MultiValue } from 'react-select'

interface PropsType {
  setActiveValidateSalarieModal: (active: boolean) => void
}

interface GroupOption {
  value: string
  label: string
}

export default function IntegrateSalarieModel({
  setActiveValidateSalarieModal,
}: PropsType) {
  const navigate = useNavigate()
  const { idSalarie } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedGroups, setSelectedGroups] = useState<GroupOption[]>([])

  const USERS_GROUP_ID = 'e4ac33c7-a458-4d0d-8102-9844aa04204d'
  const REALM = 'master'

  const GROUP_OPTIONS: GroupOption[] = [
    {
      value: '0f3c0500-aee8-4548-af3e-1109392cfc77',
      label: 'Prospection commercial',
    },
    {
      value: 'e7545c50-e304-4e07-b008-432340a53f23',
      label: 'Prospection gestionnaire',
    },
    {
      value: '2e970832-7f85-4b88-b991-0d1317350ffa',
      label: 'Prospection Manager',
    },
    {
      value: 'a1808de1-597f-43ef-9e35-de2073aabd78',
      label: 'Prospection Admin',
    },
  ]

  const ValidateEmployee = async () => {
    if (selectedGroups.length === 0) {
      notify({
        message: 'Veuillez sélectionner au moins un groupe',
        type: 'error',
      })
      return
    }

    setIsLoading(true)
    try {
      // 1️⃣ Get a valid admin token from Keycloak
      const params = new URLSearchParams()
      params.append('grant_type', 'client_credentials')
      params.append('client_id', import.meta.env.VITE_KEYCLOAK_CLIENT_ID)
      params.append(
        'client_secret',
        import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET
      )

      const tokenResponse = await axios.post(
        `${import.meta.env.VITE_KEYCLOAK_BASE_URL}/realms/master/protocol/openid-connect/token`,
        params
      )
      const accessToken = tokenResponse.data.access_token

      // 2️⃣ Remove "Users" group
      await axios.delete(
        `${import.meta.env.VITE_KEYCLOAK_BASE_URL}/admin/realms/${REALM}/users/${idSalarie}/groups/${USERS_GROUP_ID}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )

      // 3️⃣ Add selected groups
      await Promise.all(
        selectedGroups.map((group) =>
          axios.put(
            `${import.meta.env.VITE_KEYCLOAK_BASE_URL}/admin/realms/${REALM}/users/${idSalarie}/groups/${group.value}`,
            null,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          )
        )
      )

      // 4️⃣ Update user status in your app DB
      const formData = new FormData()
      formData.append('statut', 'user-approuved')

      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/users/${idSalarie}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      notify({ message: 'Contrat envoyé avec succès', type: 'success' })
      setTimeout(() => {
        setActiveValidateSalarieModal(false)
        navigate('/accueil/salariés')
        setIsLoading(false)
      }, 200)
    } catch (error) {
      console.error(error)
      notify({ message: 'Echec', type: 'error' })
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full section-email">
      <CheckCircleIcon className="w-1/3 md:w-1/4 lg:w-1/5 fill-green-500" />

      <div className="w-full h-full section-title">
        <h2 className="my-4 text-xl text-center font-semibold sm:text-2xl lg:text-4xl text-primaryblack">
          Valider la signature
        </h2>
        <p className="w-full md:w-3/4 text-gray-400 lg:w-4/5 mx-auto font-normal text-sm leading-[1.3rem] sm:text-base lg:text-lg text-subColor text-center">
          Vous êtes sur le point de valider la signature du salarié.
          Sélectionnez les groupes auxquels il appartiendra.
        </p>
      </div>

      <div className="w-3/4 mt-6">
        <Select
          isMulti
          options={GROUP_OPTIONS}
          value={selectedGroups}
          onChange={(newValue: MultiValue<GroupOption>) =>
            setSelectedGroups([...newValue])
          }
          placeholder="Sélectionner des groupes..."
        />
      </div>

      <div className="flex flex-col items-center justify-around w-full gap-4 mt-10 mb-6 md:flex-row md:justify-center md:gap-10">
        <button
          type="button"
          disabled={isLoading}
          onClick={() => setActiveValidateSalarieModal(false)}
          className="w-2/3 py-2 text-sm border rounded md:w-1/3 lg:w-48 md:text-base text-primarygray border-primarygray">
          Annuler
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={ValidateEmployee}
          className="w-2/3 py-2 text-sm text-white border rounded md:w-1/3 lg:w-48 md:text-base border-green-500 bg-green-500">
          {isLoading ? 'Loading...' : 'Valider'}
        </button>
      </div>
    </div>
  )
}
