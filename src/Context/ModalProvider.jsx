import { createContext, useCallback, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
const ModalContext = createContext({
  showModal: (content) => {},
  hideModal: () => {},
});

export function useModal() {
  return useContext(ModalContext);
}

export default function ModalProvider({ children }) {
  const [modalContent, setModalContent] = useState(null);
  const showModal = useCallback((content) => setModalContent(content), []);
  const hideModal = useCallback(() => setModalContent(null), []);

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modalContent &&
        createPortal(
          <div className="fixed inset-0 bg-black/40 backdrop-blur-lg flex items-center justify-center z-50">
            <div className="rounded shadow">{modalContent}</div>
          </div>,
          document.getElementById('modal')
        )}
    </ModalContext.Provider>
  );
}
