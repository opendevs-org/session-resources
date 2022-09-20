const random = require('random')

const handler = async (event) => {
  const num = random.int()
  return {
    statusCode: 200,
    body: JSON.stringify(`Hello from Lambda (using random package) ${num}!`),
  };
};

module.exports = { handler }
