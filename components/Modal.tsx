import { Box } from '@mui/material'
import MuiModal from '@mui/material/Modal'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'

function Modal() {

  const [showModal, setShowModal] = useRecoilState(modalState)

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="Movie Title"
      aria-describedby="Movie Detail" >
      <>
        Modal
      </>
    </MuiModal>
  )
}

export default Modal