'use client';
import { XMarkIcon } from '@heroicons/react/16/solid';
import {
  cloneElement,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

interface ModalContextValue {
  openName: string | undefined;
  open: Dispatch<SetStateAction<string>>;
  close: () => void;
}

type ModalContextProps = {
  children: React.ReactNode;
};

const ModalContext = createContext<ModalContextValue>({
  openName: '',
  open: () => {},
  close: () => {},
});

function Modal({ children }: ModalContextProps) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  opens: opensWindowName,
}: {
  children: React.ReactElement;
  opens: string;
}) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({
  children,
  name,
}: {
  children: React.ReactElement;
  name: string;
}) {
  const { openName, close } = useContext(ModalContext);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: { target: any }) {
      if (ref.current && !ref.current.contains(e.target)) close();
    }

    document.addEventListener('click', handleClick, true);

    return () => document.removeEventListener('click', handleClick, true);
  }, [close]);

  if (name !== openName) return null;

  return createPortal(
    <div className="overlay">
      <div className="modal" ref={ref}>
        <button className="absolute right-7 top-4 translate-x-3 rounded-sm border-none bg-none p-1 transition-all duration-200 hover:bg-primary-200">
          <XMarkIcon className="h-5 w-5 text-primary-600" onClick={close} />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;
export default Modal;
