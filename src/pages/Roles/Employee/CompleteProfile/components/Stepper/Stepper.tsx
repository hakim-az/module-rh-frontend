import type { Step } from '../../IntegrationSteps/IntegrationForm/IntegrationForm'

interface StepperProps {
  steps: Step[]
}

export default function Stepper({ steps }: StepperProps) {
  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1

        const getStepStyle = () => {
          switch (step.status) {
            case 'done':
              return {
                circle: 'bg-blue-500 border-blue-500 text-white',
                content: 'text-blue-500',
                icon: (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ),
              }
            case 'current':
              return {
                circle: 'border-blue-500 text-blue-500',
                content: 'text-blue-500',
                icon: index + 1,
              }
            default:
              return {
                circle: 'border-gray-400 text-gray-400',
                content: 'text-gray-500',
                icon: index + 1,
              }
          }
        }

        const { circle, content, icon } = getStepStyle()

        return (
          <div className="flex items-start" key={step.label}>
            {/* number and title */}
            <div className="flex flex-col gap-3 items-center justify-center">
              <div
                className={`flex items-center justify-center border-2 w-9 h-9 rounded-full font-medium ${circle}`}>
                {icon}
              </div>
              <div
                className={`md:text-sm text-xs text-center break-words leading-tight w-[100px] ${content}`}>
                {step.label}
              </div>
            </div>

            {/* line */}
            {!isLast && (
              <div className="h-10 flex items-center">
                <hr
                  className={`w-16 h-0.5 ${
                    step.status === 'upcoming' ? 'bg-gray-300' : 'bg-blue-500'
                  }`}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
