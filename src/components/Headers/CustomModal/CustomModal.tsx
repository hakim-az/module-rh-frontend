import React, { Fragment } from 'react'
import { Dialog, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/16/solid'

type PropsType = {
  children: React.ReactNode
  openModal: boolean
  setOpenModal: (openModal: boolean) => void
  isLoading?: boolean
}

function NewCustomModal({
  children,
  openModal,
  setOpenModal,
  isLoading,
}: PropsType) {
  return (
    <Transition show={openModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[100] overflow-y-auto bg-[#A0AEC0]/60"
        onClose={setOpenModal}>
        <div className="flex items-center justify-center min-h-screen pt-4 pb-20 text-center sm:block sm:p-0">
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">
            &#8203;
          </span>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div className="w-[90%] md:w-[80%] lg:w-[65%] h-5/6  relative inline-block align-middle bg-white rounded-lg p-6 text-left  shadow-xl transform transition-all">
              {/* close modal */}
              <div className="flex items-center justify-end w-full h-10">
                <XMarkIcon
                  onClick={() => !isLoading && setOpenModal(false)}
                  className={`w-8 h-8 ${
                    isLoading
                      ? 'fill-gray-400 cursor-not-allowed'
                      : 'fill-primaryblack hover:fill-primaryBlue cursor-pointer '
                  }`}
                />
              </div>
              {/* childrens */}
              {children}
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}

export default NewCustomModal
