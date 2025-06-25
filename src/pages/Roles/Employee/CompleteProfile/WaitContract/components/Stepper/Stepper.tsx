import type { Step } from '../../WaitContract'

interface StepperProps {
  steps: Step[]
  setCurrentStepIndex: (setCurrentStepIndex: number) => void
  currentStepIndex: number
}

export default function Stepper({
  steps,
  setCurrentStepIndex,
  currentStepIndex,
}: StepperProps) {
  return (
    <div className="flex items-center gap-x-10 justify-center">
      {steps.map((step, index) => {
        const isCurrent = index === currentStepIndex

        const circleStyle = isCurrent
          ? 'border-blue-500 text-blue-500'
          : 'border-gray-400 text-gray-400'
        const textStyle = isCurrent ? 'text-blue-500' : 'text-gray-500'
        const pointStyle = isCurrent ? 'bg-blue-500' : 'bg-gray-400'

        return (
          <div
            onClick={() => setCurrentStepIndex(index)}
            className="flex gap-8 items-stretch min-h-[90px] justify-start cursor-pointer"
            key={step.label}>
            {/* number and title */}
            <div className="flex flex-col h-full gap-3 items-center justify-center">
              <div
                className={`flex items-center justify-center border-2 w-9 h-9 rounded-full font-medium ${circleStyle}`}>
                {/* {index + 1} */}
                <span
                  className={`inline-block ${pointStyle} w-3 h-3 rounded-full`}></span>
              </div>
              <div
                className={`md:text-sm text-xs text-center break-words leading-tight w-[100px] ${textStyle}`}>
                {step.label}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
