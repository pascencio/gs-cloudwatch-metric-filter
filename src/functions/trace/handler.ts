import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const referer = event.headers.Referer ?? ''
  const userAgent = event.headers['User-Agent'] ?? ''
  const trace = {
    referer: referer,
    userAgent: userAgent,
    ...event.body
  }
  console.log(trace)
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Evento creado"
    })
  };
}

export const main = middyfy(hello);
