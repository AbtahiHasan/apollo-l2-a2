import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

const bootstrap = async () => {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log('server running at port', config.port);
    });
  } catch (error) {
    console.log(error);
  }
};

bootstrap();
