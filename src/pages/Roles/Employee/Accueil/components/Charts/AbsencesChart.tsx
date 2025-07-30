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
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'

const chartConfig = {
  visitors: {
    label: 'Absences',
  },
  enAttente: {
    label: 'En attente',
    color: '#333333',
  },
  refuser: {
    label: 'Refuser',
    color: '#EE1D52',
  },
  approuver: {
    label: 'Approuver',
    color: '#38D9A9',
  },
} satisfies ChartConfig

interface IStatus {
  approuver: number
  'en-attente': number
  refuser: number
}

export default function AbsencesChart() {
  const { userDetails } = useDashboardContext()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [absencesStatus, setAbsencesStatus] = useState<IStatus>()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const chartData = [
    {
      browser: 'enAttente',
      visitors: absencesStatus?.['en-attente'],
      fill: 'var(--color-enAttente)',
    },
    {
      browser: 'refuser',
      visitors: absencesStatus?.refuser,
      fill: 'var(--color-refuser)',
    },
    {
      browser: 'approuver',
      visitors: absencesStatus?.approuver,
      fill: 'var(--color-approuver)',
    },
  ]

  const totalStatus = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + (curr?.visitors ?? 0), 0)
  }, [chartData])

  // fetch designs
  const fetchAbsences = React.useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/absences/user/${userDetails?.id}/totals-by-status`
      )
      console.log(response)
      setAbsencesStatus(response.data)

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }, [userDetails?.id])

  useEffect(() => {
    fetchAbsences()
  }, [fetchAbsences])

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <Card className="w-full flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Statut des absences</CardTitle>
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
                  data={chartData}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={60}
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
                              Absences
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
          <div className="px-10 flex items-center justify-center gap-10 flex-wrap">
            <div className="flex items-center justify-center gap-3">
              <span className="bg-[#333333] inline-block size-5 rounded"></span>
              <span>En attente</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="bg-[#38D9A9] inline-block size-5 rounded"></span>
              <span>Approuver</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="bg-[#EE1D52] inline-block size-5 rounded"></span>
              <span>Refuser</span>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
