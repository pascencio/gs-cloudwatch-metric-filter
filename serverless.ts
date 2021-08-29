import type { AWS } from '@serverless/typescript';

import trace from '@functions/trace';
import slack from '@functions/slack';

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
  functions: {
    trace,
    slack
  },
  resources: {
    Resources: {
      TraceMetricFilter: {
        Type: 'AWS::Logs::MetricFilter',
        DependsOn: ['TraceLogGroup'],
        Properties: {
          FilterPattern: '"context: \'Payment\'" "level: \'ERROR\'" "channel: \'Unired\'"',
          LogGroupName: {
            'Ref': 'TraceLogGroup'
          },
          MetricTransformations: [{
            MetricName: 'payment-unired-error',
            MetricNamespace: '/gs-cloudwatch-metric-filter/dev',
            MetricValue: '1'
          }]
        }
      },
      TraceAlarm: {
        Type: 'AWS::CloudWatch::Alarm',
        DependsOn: ['TraceMetricFilter', 'SNSTopicTraceAlarmDispatcher'],
        Properties: {
          AlarmDescription: '10 Errores en Pago Unired en 5 minutos',
          AlarmActions: [{
            'Ref': 'SNSTopicTraceAlarmDispatcher'
          }],
          AlarmName: 'UniredPaymentError',
          Namespace: '/gs-cloudwatch-metric-filter/dev',
          ComparisonOperator: 'GreaterThanThreshold',
          Period: '300',
          Statistic: 'Sum',
          // Unit: 'Count',
          Threshold: '10',
          EvaluationPeriods: '1',
          MetricName: 'payment-unired-error'
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
