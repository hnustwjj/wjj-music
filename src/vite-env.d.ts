/// <reference types="vite/client" />
import { AttributifyAttributes } from 'windicss/types/jsx'

declare module 'react' {
  namespace JSX {
    interface HTMLAttributes extends AttributifyAttributes {}
  }
}
