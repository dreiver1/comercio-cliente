import { useQRCode } from '@vueuse/integrations/useQRCode'

export default function qrCode(data) {
  return useQRCode(data, {
    errorCorrectionLevel: 'H',
    margin: 1,
    scale: 7
  })
}
