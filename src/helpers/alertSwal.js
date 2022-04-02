import Swal from 'sweetalert2'

export const alertSwal = (ok, msg) => {
  Swal.fire({
    position: 'center',
    icon: ok ? 'success' : 'error',
    title: msg,
    showConfirmButton: false,
    timer: 1500
  })
}
