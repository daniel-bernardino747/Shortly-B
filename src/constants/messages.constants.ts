export interface Messages {
  status: number
  message: string
}

export default {
  emailUnavailable: {
    status: 409,
    message: 'Passwords do not match.',
  } as Messages,
  differentPasswords: {
    status: 422,
    message: 'Passwords do not match.',
  } as Messages,
}
