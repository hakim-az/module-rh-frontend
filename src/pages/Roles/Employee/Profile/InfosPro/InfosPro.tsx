import DisplayInput from '@/components/DisplayInput/DisplayInput'
import ProfileBanner from './components/ProfileBanner'
import { Download } from 'lucide-react'
import PDFIcon from '@/assets/icons/pdf-icon.png'
import type { UserData } from '../InfosPerso/InfoPerso'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { downloadFile } from '@/lib/downloadFile'

export default function InfosPro() {
  const [isLoadingFetch, setIsLoadingFetch] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userDetails, setUserDetails] = useState<UserData>()

  const fetchAbsenceDetails = useCallback(async () => {
    setIsLoadingFetch(true)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users/cmd4a8b5q0000gp9gkgmv3kvp`
      )
      setUserDetails(response.data.data)
    } catch (error) {
      console.error('Failed to fetch user details:', error)
    } finally {
      setIsLoadingFetch(false)
    }
  }, [])

  useEffect(() => {
    fetchAbsenceDetails()
  }, [fetchAbsenceDetails])

  const handleDownload = useCallback(async (fileName: string) => {
    if (!fileName) return

    setIsLoading(true)
    try {
      await downloadFile(fileName)
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])
  return (
    <>
      <ProfileBanner />
      {isLoadingFetch ? (
        <>Loading...</>
      ) : (
        <section className="w-11/12 max-w-[1200px] pb-28 mx-auto gap-10 flex flex-col ">
          {/* Informations bancaire : */}
          <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
            <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
              Informations bancaire :
            </span>
            {/* IBAN */}
            <DisplayInput
              label="IBAN"
              value={userDetails?.paiement.iban ?? '-'}
            />
            {/* BIC */}
            <DisplayInput
              label="BIC"
              value={userDetails?.paiement.bic ?? '-'}
            />
          </div>
          {/* Contacte d'urgence : */}
          <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
            <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
              Contacte urgence :
            </span>
            {/* Nom complet */}
            <DisplayInput
              label="Nom complet"
              value={userDetails?.urgence.nomComplet ?? '-'}
            />
            {/* Lien avec le salarié */}
            <DisplayInput
              label="Lien avec le salarié"
              value={userDetails?.urgence.lienAvecLeSalarie ?? '-'}
            />
            {/* Téléphone */}
            <DisplayInput
              label="Téléphone"
              value={userDetails?.urgence.telephone ?? '-'}
            />
          </div>
          {/* Contacte d'urgence : */}
          <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
            <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
              Définition du contrat :
            </span>
            {/* Poste */}
            <DisplayInput
              label="Poste"
              value={userDetails?.contrat.poste ?? '-'}
            />
            {/* Type de cpntrat */}
            <DisplayInput
              label="Type de cpntrat"
              value={userDetails?.contrat.typeContrat ?? '-'}
            />
            {/* Date de début */}
            <DisplayInput
              label="Date de début"
              value={userDetails?.contrat.dateDebut ?? '-'}
            />
            {/* Date de fin */}
            <DisplayInput
              label="Date de fin"
              value={userDetails?.contrat.dateFin ?? '-'}
            />
            <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
              L'établissement et le service de santé : :
            </span>
            {/* Etablissement de sante */}
            <DisplayInput
              label="Etablissement de sante"
              value={userDetails?.contrat.etablissementDeSante ?? '-'}
            />
            {/* Service de santé */}
            <DisplayInput
              label="Service de santé"
              value={userDetails?.contrat.serviceDeSante ?? '-'}
            />
          </div>
          {/* Contacte d'urgence : */}
          <div className="grid grid-cols-1 bg-white items-start lg:grid-cols-2 p-7 gap-x-8 gap-y-4 rounded-md border border-gray-200 shadow-md w-full">
            <span className="text-xl col-span-1 lg:col-span-2 w-full basis-2 font-medium inline-block text-blue-600">
              Rémuniration:
            </span>
            {/* Mode salaire de base */}
            <DisplayInput
              label="Mode salaire de base"
              value={userDetails?.contrat.salaire ?? '-'}
            />
          </div>
          {/* documents */}
          <div className="grid grid-cols-1 items-start lg:grid-cols-2 p-7 gap-12 w-full">
            {/* card 01 */}
            <div className="bg-white border gap-8 flex flex-col items-center border-gray-300 rounded-md shadow p-5">
              <img src={PDFIcon} alt="" className="w-48" />
              <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-medium">carte-vitale.pdf</span>
                  <span className="text-gray-400">5.3 Mb</span>
                </div>
                {isLoading ? (
                  <>Loading...</>
                ) : (
                  <Download
                    onClick={() => {
                      if (userDetails?.justificatif.fichierCarteVitalePdf) {
                        handleDownload(
                          userDetails?.justificatif.fichierCarteVitalePdf
                        )
                      }
                    }}
                    className="hover:text-blue-500 cursor-pointer"
                    size={32}
                  />
                )}
              </div>
            </div>
            {/* card 02 */}
            <div className="bg-white border gap-8 flex flex-col items-center border-gray-300 rounded-md shadow p-5">
              <img src={PDFIcon} alt="" className="w-48" />
              <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-medium">rib.pdf</span>
                  <span className="text-gray-400">5.3 Mb</span>
                </div>
                {isLoading ? (
                  <>Loading...</>
                ) : (
                  <Download
                    onClick={() => {
                      if (userDetails?.justificatif.fichierRibPdf) {
                        handleDownload(userDetails?.justificatif.fichierRibPdf)
                      }
                    }}
                    className="hover:text-blue-500 cursor-pointer"
                    size={32}
                  />
                )}
              </div>
            </div>
            {/* card 03 */}
            <div className="bg-white border gap-8 flex flex-col items-center border-gray-300 rounded-md shadow p-5">
              <img src={PDFIcon} alt="" className="w-48" />
              <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-medium">
                    pièce-identité.pdf
                  </span>
                  <span className="text-gray-400">5.3 Mb</span>
                </div>
                {isLoading ? (
                  <>Loading...</>
                ) : (
                  <Download
                    onClick={() => {
                      if (userDetails?.justificatif.fichierPieceIdentitePdf) {
                        handleDownload(
                          userDetails?.justificatif.fichierPieceIdentitePdf
                        )
                      }
                    }}
                    className="hover:text-blue-500 cursor-pointer"
                    size={32}
                  />
                )}
              </div>
            </div>
            {/* card 04 */}
            <div className="bg-white border gap-8 flex flex-col items-center border-gray-300 rounded-md shadow p-5">
              <img src={PDFIcon} alt="" className="w-48" />
              <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-medium">
                    justificatif-domicile.pdf
                  </span>
                  <span className="text-gray-400">5.3 Mb</span>
                </div>
                {isLoading ? (
                  <>Loading...</>
                ) : (
                  <Download
                    onClick={() => {
                      if (
                        userDetails?.justificatif.fichierJustificatifDomicilePdf
                      ) {
                        handleDownload(
                          userDetails?.justificatif
                            .fichierJustificatifDomicilePdf
                        )
                      }
                    }}
                    className="hover:text-blue-500 cursor-pointer"
                    size={32}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
