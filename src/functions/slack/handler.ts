import 'source-map-support/register';

const hello = async (event) => {
  console.log(event)
}

export const main = hello;
