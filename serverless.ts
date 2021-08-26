import type { AWS } from '@serverless/typescript';

import trace from '@functions/trace';

const serverlessConfiguration: AWS = {
  service: 'gs-cloudwatch-metric-filter',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    stage: 'dev',
    runtime: 'nodejs14.x',
    apiKeys: ["gs-cloudwatch-metric-filter-api-key"],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { trace },
};

module.exports = serverlessConfiguration;
