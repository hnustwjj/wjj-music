/// <reference types="vite/client" />
import { AttributifyAttributes } from 'windicss/types/jsx'

declare module 'react' {
  namespace JSX {
    interface HTMLAttributes<T> extends AttributifyAttributes {}
  }
}

export type FIXME = any
