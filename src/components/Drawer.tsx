import { Dialog, Transition } from "@headlessui/react";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const TwitterDrawerTransition = ({
  isOpen,
  setIsOpen,
  children,
}: React.PropsWithChildren<Props>) => {
  return (
    <Transition show={isOpen}>
      <Dialog
        className="fixed inset-0 z-40 overflow-hidden lg:hidden"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          enter="transition-opacity ease-in-out duration-250"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in-out duration-250"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="z-30 bg-gray-500 absolute inset-0 backdrop-filter bg-opacity-40" />
        </Transition.Child>
        <Transition.Child
          className="absolute inset-0 z-40 flex pointer-events-none"
          enter="transition ease duration-250 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease duration-250 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          {children}
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default TwitterDrawerTransition;
