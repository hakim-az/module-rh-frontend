import * as React from 'react'
import { Label, Pie, PieChart } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useEffect, useState } from 'react'
import axios from 'axios'

const chartConfig = {
  visitors: {
    label: 'Users',
  },
  'user-registred': {
    label: 'User Registred',
    color: '#9CA3AF',
  },
  'profile-completed': {
    label: 'Profile Completed',
    color: '#3B82F6',
  },
  'contract-uploaded': {
    label: 'Contract Uploaded',
    color: '#FBBF24',
  },
  'email-sent': {
    label: 'Email Sent',
    color: '#6366F1',
  },
  'contract-signed': {
    label: 'Contract Signed',
    color: '#EC4899',
  },
  'user-approuved': {
    label: 'User Approuved',
    color: '#10B981',
  },
} satisfies ChartConfig

interface IStatus {
  'user-registred': number
  'profile-completed': number
  'contract-uploaded': number
  'email-sent': number
  'contract-signed': number
  'user-approuved': number
}

export default function UsersChart() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [absencesStatus, setAbsencesStatus] = useState<IStatus>()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const chartData = [
    {
      browser: 'user-registred',
      visitors: absencesStatus?.['user-registred'],
      fill: 'var(--color-user-registred)',
    },
    {
      browser: 'profile-completed',
      visitors: absencesStatus?.['profile-completed'],
      fill: 'var(--color-profile-completed)',
    },
    {
      browser: 'contract-uploaded',
      visitors: absencesStatus?.['contract-uploaded'],
      fill: 'var(--color-contract-uploaded)',
    },
    {
      browser: 'email-sent',
      visitors: absencesStatus?.['email-sent'],
      fill: 'var(--color-email-sent)',
    },
    {
      browser: 'contract-signed',
      visitors: absencesStatus?.['contract-signed'],
      fill: 'var(--color-contract-signed)',
    },
    {
      browser: 'user-approuved',
      visitors: absencesStatus?.['user-approuved'],
      fill: 'var(--color-user-approuved)',
    },
  ]

  const totalStatus = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + (curr?.visitors ?? 0), 0)
  }, [chartData])

  const isEmpty = totalStatus === 0

  // If empty, show one gray slice as placeholder
  const displayChartData = isEmpty
    ? [
        {
          browser: 'Salariés',
          visitors: 1,
          fill: '#e0e0e0',
        },
      ]
    : chartData

  // fetch designs
  const fetchAbsences = React.useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users/totals-by-status`
      )
      console.log(response)
      setAbsencesStatus(response.data)

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }, [])

  useEffect(() => {
    fetchAbsences()
  }, [fetchAbsences])

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Statut des salariés</CardTitle>
            <CardDescription>
              État d'avancement de janvier à décembre 2025
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[350px]">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={displayChartData}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={90}
                  strokeWidth={5}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle">
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold">
                              {totalStatus.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground">
                              Salariés
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <div className="px-10 flex items-center justify-center gap-x-10 gap-y-5 flex-wrap">
            <div className="flex items-center justify-center gap-3">
              <span className="bg-[#9CA3AF] inline-block size-5 rounded"></span>
              <span>Compte créé</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="bg-[#3B82F6] inline-block size-5 rounded"></span>
              <span>Formulaire complété</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="bg-[#FBBF24] inline-block size-5 rounded"></span>
              <span>Contrat prêt</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="bg-[#6366F1] inline-block size-5 rounded"></span>
              <span>Email envoyé</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="bg-[#EC4899] inline-block size-5 rounded"></span>
              <span>Contrat signé</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="bg-[#10B981] inline-block size-5 rounded"></span>
              <span>Accès validé</span>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
