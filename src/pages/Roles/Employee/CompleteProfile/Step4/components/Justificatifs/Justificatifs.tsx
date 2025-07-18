import PdfIcon from '@/assets/icons/pdf-icon.png'
import { useDashboardContext } from '@/contexts/DashboardContext/DashboardContext'
import { downloadFile } from '@/lib/downloadFile'
import { Download } from 'lucide-react'
import { useCallback, useState } from 'react'

export default function Justificatifs() {
  const { userDetails, isLoadingUser } = useDashboardContext()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDownload = useCallback(async (fileName: string | undefined) => {
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
      {isLoadingUser ? (
        <>Loading...</>
      ) : (
        <section>
          <div className="grid grid-cols-1 bg-white lg:grid-cols-2 p-7 gap-10 rounded-md border border-gray-200 shadow-md w-full">
            {/* card 01 */}
            <div className="flex flex-col gap-8 items-center p-5 justify-center border border-gray-300 rounded-md">
              <img src={PdfIcon} alt="pdf-icon" className="w-40" />
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-black">
                    Carte vitale
                  </span>
                  <span className="text-xs text-gray-400">5.3 Mb</span>
                </div>
                {isLoading ? (
                  <>Loading...</>
                ) : (
                  <Download
                    onClick={() =>
                      handleDownload(
                        userDetails?.justificatif.fichierCarteVitalePdf
                      )
                    }
                    className="hover:text-blue-600 cursor-pointer"
                  />
                )}
              </div>
            </div>
            {/* card 02 */}
            <div className="flex flex-col gap-8 items-center p-5 justify-center border border-gray-300 rounded-md">
              <img src={PdfIcon} alt="pdf-icon" className="w-40" />
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-black">Rib</span>
                  <span className="text-xs text-gray-400">5.3 Mb</span>
                </div>
                {isLoading ? (
                  <>Loading...</>
                ) : (
                  <Download
                    onClick={() =>
                      handleDownload(userDetails?.justificatif.fichierRibPdf)
                    }
                    className="hover:text-blue-600 cursor-pointer"
                  />
                )}
              </div>
            </div>
            {/* card 03 */}
            <div className="flex flex-col gap-8 items-center p-5 justify-center border border-gray-300 rounded-md">
              <img src={PdfIcon} alt="pdf-icon" className="w-40" />
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-black">
                    Pièce d'identité
                  </span>
                  <span className="text-xs text-gray-400">5.3 Mb</span>
                </div>
                {isLoading ? (
                  <>Loading...</>
                ) : (
                  <Download
                    onClick={() =>
                      handleDownload(
                        userDetails?.justificatif.fichierPieceIdentitePdf
                      )
                    }
                    className="hover:text-blue-600 cursor-pointer"
                  />
                )}
              </div>
            </div>
            {/* card 04 */}
            <div className="flex flex-col gap-8 items-center p-5 justify-center border border-gray-300 rounded-md">
              <img src={PdfIcon} alt="pdf-icon" className="w-40" />
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-black">
                    Justificatif de domicile
                  </span>
                  <span className="text-xs text-gray-400">5.3 Mb</span>
                </div>
                {isLoading ? (
                  <>Loading...</>
                ) : (
                  <Download
                    onClick={() =>
                      handleDownload(
                        userDetails?.justificatif.fichierJustificatifDomicilePdf
                      )
                    }
                    className="hover:text-blue-600 cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}{' '}
    </>
  )
}
