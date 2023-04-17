import { NextApiRequest, NextApiResponse } from 'next'

/**
 * Can be used for testing purposes to easier have access to auth0 accessToken
 * @param _
 * @param res
 */
export default function handler(_: NextApiRequest, res: NextApiResponse) {
  const accessToken = res.getHeaders()?.['access-token'] || ''

  res.status(200).json(accessToken)
}