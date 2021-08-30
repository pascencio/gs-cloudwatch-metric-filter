import 'source-map-support/register';

import { WebClient } from '@slack/web-api';
const token = process.env.SLACK_TOKEN;
const channel = process.env.SLACK_CHANNEL;
const web = new WebClient(token);

const hello = async (event) => {
  try {
    const textMessage = event.Records[0].Sns.Message;
    const message = JSON.parse(textMessage);
    const result = await web.chat.postMessage({
      text: `${message.Region}: ${message.AlarmDescription}`,
      channel: channel,
    });
    console.info(result)
  } catch (error) {
    console.error(error);
  }
}

export const main = hello;
