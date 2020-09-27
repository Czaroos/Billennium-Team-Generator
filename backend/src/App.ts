import BodyParser from 'body-parser';
import cors from 'cors';
import express, { Express } from 'express';
import { Server } from 'http';
import { Mongoose } from 'mongoose';
import { Controllers } from '@controllers';
import { DBConnection } from '@db';
import { PORT } from '@consts';

class App {
  private app: Express;
  public db: Mongoose;
  public server: Server;

  constructor() {
    this.configure();
    this.registerRoutes();
    this.createServer();
    this.initDb();
  }

  /** Creates express app. */
  private configure = () => {
    this.app = express();

    this.app.set('port', PORT || 3000);

    this.app.use(BodyParser.json());
    this.app.use(BodyParser.urlencoded({ extended: true }));
    this.app.use(cors({ credentials: false }));
  };

  /** Register routes in application. */
  private registerRoutes = () => {
    Controllers.forEach(({ path, controller }) => {
      this.app.use(`/api/${path}`, controller);
    });
  };

  /** Logs information after server start. */
  private log = () => {
    console.log(
      `Service running at port ${this.app.get('port')} in ${this.app.get(
        'env',
      )} mode`,
    );
    console.log('Date: ', new Date().toDateString());
  };

  /** Creates server and adds logger. */
  private createServer = () => {
    this.server = this.app.listen(this.app.get('port'), this.log);
  };

  /** Initializes database. */
  private initDb = () => {
    this.db = DBConnection;
  };
}

export default new App();
