import { useCallback, useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
  Search,
  Filter,
  Calendar,
  FileText,
  Download,
  Clock,
  ChevronDown,
  Loader2,
  FolderOpen,
  X,
  Eye,
} from 'lucide-react'
import PagePath from '@/components/PagePath/PagePath'
import DisplayPdf from '@/components/DisplayPdf/DisplayPdf'

type ICoffreFort = {
  id: string
  idUser: string
  typeBulletin: string
  mois: string
  annee: string
  note: string
  fichierJustificatifPdf: string
  createdAt: string
  updatedAt: string
  user: {
    nomDeNaissance: string
    prenom: string
    emailProfessionnel: string
    avatar: string
  }
}

export default function Coffre() {
  // token
  const authUser = JSON.parse(sessionStorage.getItem('auth_user') || '{}')
  const token = authUser?.token

  const { idSalarie } = useParams()

  const [openPdfModal, setOpenPdfModal] = useState(false)
  const [fileUrl, setFileUrl] = useState('')

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [coffres, setCoffres] = useState<ICoffreFort[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedMois, setSelectedMois] = useState<string>('')
  const [selectedAnnee, setSelectedAnnee] = useState<string>('')
  const [showFilters, setShowFilters] = useState<boolean>(false)

  // download file
  const [downloadingKey, setDownloadingKey] = useState<boolean>(false)

  const forceDownload = async (url: string | undefined, filename?: string) => {
    if (!url) return // ⬅️ guard against undefined

    setDownloadingKey(true)
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = filename || url.split('/').pop() || 'file.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(link.href)
    } catch (err) {
      console.error('Download failed:', err)
    } finally {
      setDownloadingKey(false)
    }
  }

  // fetch coffres
  const fetchCoffres = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/coffres/user/${idSalarie}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(response)
      setCoffres(response.data || [])
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
      setCoffres([])
    }
  }, [idSalarie, token])

  useEffect(() => {
    fetchCoffres()
  }, [fetchCoffres])

  // Get unique values for filters
  const { types, mois, annees } = useMemo(() => {
    const types = [
      ...new Set(coffres.map((coffre) => coffre.typeBulletin)),
    ].sort()
    const mois = [...new Set(coffres.map((coffre) => coffre.mois))].sort()
    const annees = [...new Set(coffres.map((coffre) => coffre.annee))].sort()
    return { types, mois, annees }
  }, [coffres])

  // Filtered data
  const filteredCoffres = useMemo(() => {
    return coffres.filter((coffre) => {
      const matchesSearch =
        coffre.typeBulletin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coffre.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coffre.user.nomDeNaissance
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        coffre.user.prenom.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = !selectedType || coffre.typeBulletin === selectedType
      const matchesMois = !selectedMois || coffre.mois === selectedMois
      const matchesAnnee = !selectedAnnee || coffre.annee === selectedAnnee

      return matchesSearch && matchesType && matchesMois && matchesAnnee
    })
  }, [coffres, searchTerm, selectedType, selectedMois, selectedAnnee])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedType('')
    setSelectedMois('')
    setSelectedAnnee('')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const getTypeColor = (type: string) => {
    const colors = {
      'Bulletin de paie': 'bg-blue-100 text-blue-800 border-blue-200',
      'Contrat de travail': 'bg-green-100 text-green-800 border-green-200',
      'Attestation employeur':
        'bg-purple-100 text-purple-800 border-purple-200',
    }
    return (
      colors[type as keyof typeof colors] ||
      'bg-gray-100 text-gray-800 border-gray-200'
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Chargement du coffre-fort...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <PagePath />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Coffre-Fort Numérique
            </h1>
            <p className="text-gray-600">
              Gérez et consultez vos documents en toute sécurité
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher dans les documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter className="h-4 w-4" />
                Filtres avancés
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
                />
              </button>

              {(selectedType || selectedMois || selectedAnnee) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <X className="h-4 w-4" />
                  Effacer les filtres
                </button>
              )}
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de document
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Tous les types</option>
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mois
                  </label>
                  <select
                    value={selectedMois}
                    onChange={(e) => setSelectedMois(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Tous les mois</option>
                    {mois.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Année
                  </label>
                  <select
                    value={selectedAnnee}
                    onChange={(e) => setSelectedAnnee(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Toutes les années</option>
                    {annees.map((annee) => (
                      <option key={annee} value={annee}>
                        {annee}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredCoffres.length} document
              {filteredCoffres.length !== 1 ? 's' : ''} trouvé
              {filteredCoffres.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Documents Grid */}
          {filteredCoffres.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <FolderOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun document trouvé
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || selectedType || selectedMois || selectedAnnee
                  ? 'Essayez de modifier vos critères de recherche'
                  : "Aucun document n'est disponible dans ce coffre-fort"}
              </p>
              {(searchTerm ||
                selectedType ||
                selectedMois ||
                selectedAnnee) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Effacer les filtres
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCoffres.map((coffre) => (
                <div
                  key={coffre.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Document Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(coffre.typeBulletin)}`}>
                          <FileText className="h-3 w-3 mr-1" />
                          {coffre.typeBulletin}
                        </span>
                      </div>
                      <button
                        type="button"
                        disabled={downloadingKey}
                        onClick={() =>
                          forceDownload(coffre.fichierJustificatifPdf)
                        }
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Télécharger le document">
                        <Download className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Document Info */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {coffre.mois} {coffre.annee}
                        </span>
                      </div>

                      {coffre.note && (
                        <div className="flex items-start gap-3">
                          <FileText className="h-4 w-4 text-gray-400 mt-0.5" />
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {coffre.note}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <img
                        src={coffre.user.avatar}
                        alt={`${coffre.user.prenom} ${coffre.user.nomDeNaissance}`}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {coffre.user.prenom} {coffre.user.nomDeNaissance}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {coffre.user.emailProfessionnel}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Document Footer */}
                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Créé le {formatDate(coffre.createdAt)}
                      </div>
                      <span
                        onClick={() => {
                          setFileUrl(coffre.fichierJustificatifPdf)
                          setOpenPdfModal(true)
                        }}
                        className="font-medium cursor-pointer text-blue-600">
                        <Eye className="w-4 h-4 group-hover:text-blue-500" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <DisplayPdf
        openModal={openPdfModal}
        setOpenModal={setOpenPdfModal}
        fileUrl={fileUrl}
      />
    </>
  )
}
