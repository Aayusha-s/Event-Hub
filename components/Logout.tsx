import React from 'react'

type LogoutProps = {
    isOpen?: boolean;
    onClose: () => void;
}
const Logout = ({
    isOpen,
    onClose
}: LogoutProps) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-4 m-2 rounded-lg w-full max-w-3xl  max-h-[90vh] overflow-y-auto">

                <div>
                    <h3 className="font-bold text-md md:text-lg lg:text-xl">Logout</h3>
                    <div className="border-b my-2 border-brown-normal"></div>
                </div>
                <div className="space-y-4 mb-4">
                    <p className="font-medium text-md md:text-lg lg:text-xl">
                        Are you sure you want to logout?
                    </p>
                </div>
                <div className="flex justify-end gap-4">
                    <button

                        className="bg-gray-300 text-black rounded-lg px-4 py-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 text-white rounded-lg px-4 py-2"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>


    )
}

export default Logout
