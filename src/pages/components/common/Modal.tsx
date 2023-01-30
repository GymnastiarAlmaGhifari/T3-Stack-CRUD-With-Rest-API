import { FC } from "react"

interface ModalProps {
    // children: React.ReactNode
    isVisible: boolean,
    onClose: () => void,
    children: React.ReactNode

}
const Modal: FC<ModalProps> = ({ isVisible, onClose, children }) => {


    if (!isVisible) return null

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                <div className="w-[600px] flex flex-col">
                    {/* onClose button */}
                    <button
                        className="self-end mr-4 mt-4"
                        onClick={onClose}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    <div className="bg-white p-2 rounded">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
