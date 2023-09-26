import { Dispatch, ReactNode, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

// Components
import Button from '@/components/common/Button'

interface IProps {
    children: ReactNode
    preventOverlayClose?: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>> | (() => void)
}

const Modal = ({ children, preventOverlayClose, setIsOpen }: IProps) => {
    return (
        <Dialog.Root
            onOpenChange={setIsOpen}
            modal
            open
        >
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-10 flex items-center justify-center bg-[rgba(0,0,0,0.80)]">
                    <Dialog.Content
                        className="bg-white relative mx-auto max-h-full max-w-full overflow-auto rounded"
                        onInteractOutside={(e) => {
                            if (preventOverlayClose) e.preventDefault()
                        }}
                    >
                        <Button
                            variation="transparent"
                            hasBorder={false}
                            size="sm"
                            className="absolute right-2 top-2.5 h-10 w-10"
                            onClick={() => setIsOpen(false)}
                        >
                            x
                        </Button>
                        {children}
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default Modal
