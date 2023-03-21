# Visor Chat Lambda Socket

[![Pipeline Workflow](https://github.com/JeffersonGibin/visor-chat-lmb-socket/actions/workflows/pipeline.yml/badge.svg)](https://github.com/JeffersonGibin/visor-chat-lmb-socket/actions/workflows/pipeline.yml)

## What is this project ?

This service is part of the project for the selective process of the Visor. The project is a service to work with socket.

## Architecture

![image](https://user-images.githubusercontent.com/6215779/226264258-65a437b2-dd5b-4e78-af14-3670e7757dc9.png)

## Pipeline flow

![image](https://user-images.githubusercontent.com/6215779/226262534-633ad887-a400-4ef7-a1a6-868a221090dc.png)

## What is this project ?

## How start the project in the localhost?

To execute docker-compose local using Cognito you need environments variables in the your System Operacional but this is not a proposity the
project. The proposity is delivery of the project deployed in the cloud.

```shell
## Region AWS
export AWS_REGION=us-east-1

# Endpoint API Gateway
export GW_ENDPOINT=""

# Credentials Chat GPT
export OPENAI_API_KEY=""

# Credentials with access programatic
export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=

```

## Action Socket

| Action        | Description                 | Payload                                                                     |
| ------------- | --------------------------- | --------------------------------------------------------------------------- |
| _sendMessage_ | send message to user socket | `{"action": "sendMessage", "to": "AI", "from": "Josh", "message": "Hello"}` |

## Tecnologies

- serverless
- javascript
- express
- jest
- docker
