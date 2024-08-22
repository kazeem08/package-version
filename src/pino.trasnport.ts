/* eslint-disable @typescript-eslint/no-var-requires */
const { Transform } = require('readable-stream');
const abstractTransport = require('pino-abstract-transport');
const sonic = require('sonic-boom');
const pump = require('pump');
// import sjs from 'secure-json-parse';
// const sentry = require('@sentry/node');

export default function (): any {
  return abstractTransport(
    function (source: {
      on: (arg0: string, arg1: (line: any) => void) => void;
    }) {
      const stream = new Transform({
        objectMode: true,
        autoDestroy: true,
        transform(
          chunk: string,
          enc: any,
          cb: (arg0: null, arg1: string) => void,
        ): void {
          //   chunk = formatLog(chunk, options.cacheService);
          const line = transformLog(chunk);
          cb(null, line);
        },
      });
      const destination = sonic({
        dest: 1,
      });
      source.on('unknown', function (line: any) {
        destination.write(`${line}\n`);
      });
      pump(source, stream, destination);
      return stream;
    },
    { parse: 'lines' },
  );
}

const transformLog = (data) => {
  //   console.log('data', data);
  return data;
};
