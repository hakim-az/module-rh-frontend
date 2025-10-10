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

  // token
  const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
  const token = authUser?.token

  const USERS_GROUP_ID = 'e4ac33c7-a458-4d0d-8102-9844aa04204d'
  const REALM = 'master'

  const GROUP_OPTIONS: GroupOption[] = [
    // salariés
    {
      value: '7d5af3a8-ffab-4b46-b608-ea7d90c1056b',
      label: 'Comptabilité',
    },
    {
      value: '96facf48-f97e-4b43-907b-16b7dbffebc4',
      label: 'Formation',
    },
    {
      value: '9e799fc2-ee4b-463b-b72f-222e7a2fdba9',
      label: 'Gestion',
    },
    {
      value: '74736260-b0c9-4002-96b7-fcaac4af7bbf',
      label: 'IT',
    },
    {
      value: '801ac0f7-fa6b-4ed8-a6fa-a5a416e6f851',
      label: 'Marketing / Communication',
    },
    {
      value: 'bd2b18c3-5335-4d1d-b9f7-7091f147b0b2',
      label: 'Ressources Humaines',
    },
    // prospection
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
    {
      value: 'a02931c8-9bfb-49ab-bd20-ed2416a0e8ea',
      label: 'Prospection Directeur',
    },
    // rh
    {
      value: 'd662844e-7cfc-44df-aec1-9db763b0f324',
      label: 'RH Assistant',
    },
    {
      value: 'bf1dde96-eb99-46b4-8920-27ccb67723c9',
      label: 'RH Manager',
    },
    // vente
    {
      value: '86e493f7-7a78-4e7d-ac1a-9bced2037da9',
      label: 'Vente Admin',
    },
    {
      value: 'ab894891-23fb-4cd5-bc48-a776b6611bf3',
      label: 'Vente Commercial',
    },
    {
      value: '65888698-c0fc-493a-8c80-93fb620eca66',
      label: 'Vente Manager',
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
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
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
          className="w-2/3 disabled:cursor-not-allowed disabled:opacity-30 py-2 text-sm border rounded md:w-1/3 lg:w-48 md:text-base text-primarygray border-primarygray">
          Annuler
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={ValidateEmployee}
          className="w-2/3 disabled:cursor-not-allowed disabled:opacity-30 py-2 text-sm text-white border rounded md:w-1/3 lg:w-48 md:text-base border-green-500 bg-green-500">
          {isLoading ? 'Chargement...' : 'Valider'}
        </button>
      </div>
    </div>
  )
}
