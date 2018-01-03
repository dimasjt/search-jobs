import { format } from "currency-formatter"

export default (num) => (
  format(num, { code: "IDR" })
)