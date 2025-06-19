import { Separator } from '@/components/ui/separator'
import clsx from 'clsx'
import { Check } from 'lucide-react'
import { Fragment } from 'react'

interface StepperIndicatorProps {
  activeStep: number
}

const StepperIndicator = ({ activeStep }: StepperIndicatorProps) => {
  return (
    <div className="flex max-w-[1200px] mx-auto justify-center items-center">
      {[1, 2, 3].map((step) => (
        <Fragment key={step}>
          <div
            className={clsx(
              'w-[40px] h-[40px] min-h-10 min-w-10 flex justify-center items-center m-[5px] border-[2px] rounded-full',
              step < activeStep && 'bg-blue-500 text-white',
              step === activeStep && 'border-blue-500 text-blue-500'
            )}>
            {step >= activeStep ? step : <Check className="h-5 w-5" />}
          </div>

          {step !== 3 && (
            <Separator
              orientation="horizontal"
              className={clsx(
                'w-[20px] max-w-[100px] h-[2px]',
                step <= activeStep - 1 && 'bg-blue-500'
              )}
            />
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default StepperIndicator
