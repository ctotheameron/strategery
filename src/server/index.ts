import app from './app';
import log from './util/log';


/**
 * Start server
 */

const PORT = process.env.PORT || '4000';

app.listen(PORT, () => {
    log.info(`Server listening on port ${PORT}`);
});


export default app;
