import React from 'react'
import Button from './Button';

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
        <div className="fixed inset-0 bg-text-dark/20 flex items-center justify-center z-50 p-4">
            <div className="surface-card w-full max-w-md max-h-[90vh] overflow-y-auto p-6 shadow-lg">

                <div>
                    <h3 className="text-lg font-semibold text-text-dark md:text-xl">Logout</h3>
                    <div className="my-3 border-b border-divider"></div>
                </div>
                <div className="mb-6 space-y-4">
                    <p className="text-sm leading-relaxed text-text-light md:text-base">
                        Are you sure you want to logout?
                    </p>
                </div>
                <div className="flex justify-end gap-3">
                    <Button text="Cancel" variant="secondary" onClick={onClose} />
                    <Button text="Logout" status="danger" onClick={onClose} />
                </div>
            </div>
        </div>


    )
}

export default Logout
