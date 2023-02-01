import { useRef, FC } from "react"
import { Dialog } from '@headlessui/react';

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    title: string;
    description: string;
    handleCancel: () => void;
    initialFocus?: React.RefObject<HTMLElement>;

}

interface ModalDetailProps {
    children: React.ReactNode;
    onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ children, isOpen, handleCancel, title, description }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={handleCancel}
            className="relative z-50"
        >
            <div
                className="fixed inset-0 bg-black/30"
                aria-hidden="true"
            />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="mx-auto max-w-md bg-white dark:bg-gray-700 p-8 rounded-xl flex flex-col gap-4">

                    <Dialog.Title className="font-bold text-2xl">{title}</Dialog.Title>
                    <Dialog.Description>{description}</Dialog.Description>

                    <div className="flex flex-col gap-4">{children}</div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export const ModalForm = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex flex-col gap-4">{children}</div>;
};
export const ModalActions = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex justify-end gap-4">{children}</div>;
};

export const ModalDetail: FC<ModalDetailProps> = ({ children, onClose }) => {
    return (
        <Dialog
            open={true}
            onClose={onClose}
            className="relative z-50"
        >
            <div
                className="fixed inset-0 bg-black/30"
                aria-hidden="true"
            />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="mx-auto max-w-md bg-white dark:bg-gray-700 p-8 rounded-xl flex flex-col gap-4">

                    <div className="flex flex-col gap-4">{children}</div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

