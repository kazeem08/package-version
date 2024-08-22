import ecsFormat from '@elastic/ecs-pino-format';
import { RequestMethod } from '@nestjs/common';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

const loggerBootstrap = {
  imports: [],
  useFactory: () => ({
    pinoHttp: {
      ...ecsFormat({
        serviceName: 'Hello',
        serviceEnvironment: 'dev',
      }),
      level: 'info',
      quietReqLogger: true,
      autoLogging: true,
      redact: ['req.headers.authorization'],
      genReqId: (req: Request) => req.headers['x-request-id'] || uuidv4(),
      formatters: {
        level: (label: string) => {
          return { level: label };
        },
      },

      customProps: () => {
        return { club: 'madrid' };
      },
    },
    exclude: [{ method: RequestMethod.GET, path: 'api/health' }],
  }),
  inject: [],
};

export default loggerBootstrap;
