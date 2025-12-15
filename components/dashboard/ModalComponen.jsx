const ModalComponent = ({
  open,
  close,
  children,
  bottomModal,
  activeBtnClose,
  Padding,
  Margin,
}) => {
  return (
    <>
      <dialog
        className={`modal  ${open ? "modal-open" : ""} ${bottomModal ? "modal-bottom" : ""}`}
      >
        <div className={`modal-box ${Padding ? "p-0":""} ${Margin ? "m-0":""}  h-[50%] overflow-x-hidden`}>
          {children}
          <div className="modal-action">
            {activeBtnClose && (
              <button className="btn" onClick={close}>
                Close
              </button>
            )}
          </div>
          {/* Close Modal With Body  */}
        </div>
        <form method="dialog" className="modal-backdrop" onClick={close}>
          <button>Close</button>
        </form>
      </dialog>
    </>
  );
};

export default ModalComponent;
