export default {
  type: "object",
  properties: {
    context: { type: 'string' },
    level: { type: 'string' },
    clientId: { type: 'string' },
    customerId: { type: 'string' },
    requestId: { type: 'string' },
    message: { type: 'string' },
    stack: { type: 'string' },
    tags: { type: 'object' },
  },
  required: ['context', 'level', 'tags', 'requestId', 'clientId']
} as const;
