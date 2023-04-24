import React from 'react';
import { Modal, Button, Text, Loading } from '@nextui-org/react';

interface ModalProps {
  isLoading: boolean;
  visible: boolean;
  closeHandler: () => void;
  hash: string;
  errorMessage?: string;
}

const LoadModal = ({
  closeHandler,
  visible,
  hash,
  isLoading,
  errorMessage,
}: ModalProps) => {
  return (
    <>
      <Modal
        closeButton
        blur
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" b size={18}>
            Your Transaction
          </Text>
        </Modal.Header>
        {isLoading ? (
          <Loading type="default" />
        ) : (
          <>
            <Modal.Body>
              {errorMessage ? (
                <Text color="error" className=" text-center text-xl">
                  {errorMessage}
                </Text>
              ) : (
                <>
                  <Button
                    flat
                    auto
                    onClick={() =>
                      window.open(
                        `https://explorer.sui.io/txblock/${hash}`,
                        '_blank'
                      )
                    }
                  >
                    View on Explorer
                  </Button>
                </>
              )}
            </Modal.Body>
          </>
        )}

        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default LoadModal;
