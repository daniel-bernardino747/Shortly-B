import { Messages } from '@messages'

export class ClientError extends Error {
  status: number
  constructor({ status, message }: Messages, ...params: string[]) {
    super(...params)
    this.status = status
    this.message = message
  }
}
