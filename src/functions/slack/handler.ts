import 'source-map-support/register';

const hello = async (event) => {
  console.log(JSON.stringify(event))
}

export const main = hello;
