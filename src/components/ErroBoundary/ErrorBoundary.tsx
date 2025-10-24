import React from 'react'

type Props = {
  children: React.ReactNode
  fallback?: React.ReactNode
}

type State = {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // ✅ Log to console or external monitoring service (e.g., Sentry)
    console.group(
      '%c[Erreur détectée par ErrorBoundary]',
      'color: red; font-weight: bold;'
    )
    console.error('Message:', error.message)
    console.error('Stack trace:', error.stack)
    console.error('React component stack:', info.componentStack)
    console.groupEnd()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-center text-gray-800 px-4">
          <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
            <h1 className="text-2xl font-semibold mb-4 text-blue-600">
              ⚠️ Une erreur est survenue
            </h1>

            <p className="text-gray-700 leading-relaxed mb-2">
              Nous avons rencontré un problème lors du chargement de cette page.
            </p>
            <p className="text-gray-600 text-sm mb-6">
              Cela peut être dû à une erreur technique ou à une ressource qui
              n’a pas pu être chargée.
              <br />
              Veuillez actualiser la page pour essayer à nouveau.
            </p>

            {/* ✅ Error message (for developer awareness) */}
            {this.state.error?.message && (
              <div className="bg-gray-100 text-gray-700 text-sm p-3 rounded-md mb-6 font-mono">
                <p className="font-semibold text-red-500">
                  Détails techniques :
                </p>
                <p>{this.state.error.message}</p>
              </div>
            )}

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-200">
              🔄 Actualiser la page
            </button>

            <p className="mt-6 text-xs text-gray-400">
              Si le problème persiste, contactez le support technique.
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
