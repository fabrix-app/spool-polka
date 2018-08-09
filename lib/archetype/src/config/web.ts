import * as polka from 'polka'

/**
 * Server Configuration
 * (app.config.web)
 *
 * Configure the Web Server
 *
 * @see {@link http://fabrix.app/doc/config/web}
 */
export const web = {
  polka: polka,

  /**
   * CORS options
   * Can be true/false or an object of CORS options
   * @see {@link https://github.com/polkajs/cors#configuring-cors}
   */
  cors: false,

  /**
   * Init method, can be used to customize polka instance
   */
  // init: (fabrixApp, polkaApp) => {},

  /**
   * Middlewares to load (in order)
   */
  middlewares: {

    /*
    // middlewares loading order
    order: [
     'addMethods',
     'cookieParser',
     'session',
     'bodyParser',
     'compression',
     'methodOverride',
     'www',
     'router',
     '404',
     '500'
    ] */

    /**
     * Middlewares to load for body parsing
    bodyParser: [
      bodyParser.json(),
      bodyParser.urlencoded({extended: false})
    ]
     */

  },

  /***************************************************************************
   *                                                                          *
   * The number of seconds to cache flat files on disk being served by        *
   * Polka static middleware (by default, these files are in `.tmp/public`) *
   *                                                                          *
   * The HTTP static cache is only active in a 'production' environment,      *
   * since that's the only time Polka will cache flat-files.                *
   *                                                                          *
   ***************************************************************************/

  cache: 31557600000,

  /**
   * The port to bind the web server to
   */
  port: process.env.PORT || 3000,

  /**
   * The host to bind the web server to
   */
  host: process.env.HOST || '0.0.0.0'

  /**
   * Alternate method to add multiple template engine, for single view template use config.views.engine
   */
  /*
  views: {
    engines: {
      // html: require('some-view-engine')
    },
    path: 'views'
  },
  */

  /**
   * External configuration
   * Must return a promise with the native http/https server instance
   * @return Promise
   */
  /*
  externalConfig: (fabrixApp, polkaApp) => {

  },
  */
  /**
   * SSL options
   * Cert and key or pfx to create HTTPS server
   */
  /*
  ssl: {
    key: fs.readFileSync('path/to/private.key'),
    cert: fs.readFileSync('path/to/certificate.pem')
    // OR pfx: fs.readFileSync('path/to/server.pfx')
  },
   */
  /**
   * Automatically redirect HTTP to HTTPS
   * Create an HTTP server who redirect to HTTPS server
   * Work only if SSL is enabled
   */
  // redirectToHttps: false,

  /**
   * Http port to use if you want to enable http and https
   * SSL need to be enabled
   */
  // portHttp: 80
}
