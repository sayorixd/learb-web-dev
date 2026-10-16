import { useEffect, useRef } from "react"

export default function SuccessModal({ text, onClose }) {
  const dialogRef = useRef();

  useEffect(() => {
    dialogRef.current.showModal();
  }, [])

  return (
    <dialog ref={dialogRef} id="modal" onClose={onClose}>
      <h3>{text}</h3>
      <div><button onClick={() => dialogRef.current.close()} className="button-primary">OK</button></div>
    </dialog>
  )
}