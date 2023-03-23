import AWS from "aws-sdk";
const cognito = new AWS.CognitoIdentityServiceProvider({
  apiVersion: "2016-04-18",
  // eslint-disable-next-line no-undef
  region: process.env.AWS_COGNITO_REGION,
});

export const validateToken = async (token) => {
  const data = await cognito.getUser({ AccessToken: token }).promise();

  const result = data.UserAttributes.reduce((newObject, item) => {
    newObject[item.Name] = item["Value"];

    return newObject;
  }, {});

  return result;
};
