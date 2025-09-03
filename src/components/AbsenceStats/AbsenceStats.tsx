import { Award, BarChart, CalendarDays, CheckCircle, Clock } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import axios from 'axios'
import { useState } from 'react'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'

interface AbsenceStatsProps {
  userId: string | undefined
  entryDate: string | undefined
  defaultCurrentDate?: string
}

export default function AbsenceStats({
  userId,
  entryDate,
  defaultCurrentDate,
}: AbsenceStatsProps) {
  const [currentDate, setCurrentDate] = useState(
    defaultCurrentDate || format(new Date(), 'yyyy-MM-dd')
  )

  const { userDetails } = useDashboardContext()

  // token
  const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
  const token = authUser?.token

  const initialStartDate = entryDate
    ? format(new Date(entryDate), 'yyyy-MM-dd')
    : `${new Date().getFullYear()}-06-01`

  const [startDate, setStartDate] = useState(initialStartDate)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['absenceStats', userId, currentDate, startDate],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/absences/holidays-cumulative`,
        {
          params: {
            userId: userId, // <- corrige ici
            dateDebut: startDate,
            dateFin: currentDate,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    },
    enabled: !!userId,
  })

  return (
    <div className="w-full max-w-[1280px] mx-auto">
      {/* Header + Date Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">Mes jours de congés</h2>

        <div className="flex flex-col sm:flex-row sm:items-end gap-8">
          {userDetails?.role === 'employee' && (
            <>
              {entryDate && (
                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg shadow-sm">
                  <span className="font-medium">Date d'entrée :</span>{' '}
                  {format(new Date(entryDate), 'yyyy-MM-dd')}
                </div>
              )}
            </>
          )}

          {userDetails?.role === 'hr' && (
            <div className="flex items-end gap-2">
              <div className="flex flex-col gap-2">
                <span>Début de contrat</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border bg-white rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {entryDate && (
                <button
                  type="button"
                  onClick={() => setStartDate(initialStartDate)}
                  className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm"
                  title="Retour à la date d'entrée">
                  ↺
                </button>
              )}
            </div>
          )}

          <div className="flex items-center gap-2">
            {/* Current Date Input + Reset */}
            <input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              className="border bg-white rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setCurrentDate(format(new Date(), 'yyyy-MM-dd'))}
              className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm"
              title="Réinitialiser à aujourd'hui">
              ↺
            </button>
          </div>
        </div>
      </div>

      {/* States */}
      {isLoading && (
        <p className="text-center text-gray-500">Chargement des données...</p>
      )}
      {isError && (
        <p className="text-center text-red-500">
          Impossible de charger les détails d&apos;absence.
        </p>
      )}

      {/* Stats */}
      {data && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Jours acquis */}
          <div className="bg-white gap-14 p-6 flex flex-col items-start justify-between rounded-xl shadow hover:shadow-lg transition">
            <CalendarDays className="w-20 h-20 text-blue-500 mb-2" />
            <div className="flex items-center justify-between w-full">
              <p className="text-gray-600 text-xl font-medium">Jours acquis</p>
              <p className="text-2xl font-bold text-blue-600">{data.acquis}</p>
            </div>
          </div>
          {/*  Jours utilisés */}
          <div className="bg-white gap-14 p-6 flex flex-col items-start justify-between rounded-xl shadow hover:shadow-lg transition">
            <Clock className="w-20 h-20 text-orange-500 mb-2" />
            <div className="flex items-center justify-between w-full">
              <p className="text-gray-600 text-xl font-medium">
                Jours utilisés
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {data.consommes}
              </p>
            </div>
          </div>
          {/* Jours restants */}
          <div className="bg-white gap-14 p-6 flex flex-col items-start justify-between rounded-xl shadow hover:shadow-lg transition">
            <CheckCircle className="w-20 h-20 text-green-500 mb-2" />
            <div className="flex items-center justify-between w-full">
              <p className="text-gray-600 text-xl font-medium">
                Jours restants
              </p>
              <p className="text-2xl font-bold text-green-600">
                {data.restants}
              </p>
            </div>
          </div>
          {/* Totla jours acquis */}
          <div className="bg-white gap-14 p-6 flex flex-col items-start justify-between rounded-xl shadow hover:shadow-lg transition">
            <Award className="w-20 h-20 text-purple-500 mb-2" />
            <div className="flex items-center justify-between w-full">
              <p className="text-gray-600 text-xl font-medium">
                Total jours acquis
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {data.totalAcquisDepuisDebut}
              </p>
            </div>
          </div>
          {/* Jours consommés totaux depuis le début */}
          <div className="bg-white gap-14 p-6 flex flex-col items-start justify-between rounded-xl shadow hover:shadow-lg transition">
            <BarChart className="w-20 h-20 text-red-500 mb-2" />
            <div className="flex items-center justify-between w-full">
              <p className="text-gray-600 text-xl font-medium">
                Total jours utilisés
              </p>
              <p className="text-2xl font-bold text-red-600">
                {data.totalConsommesDepuisDebut}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
