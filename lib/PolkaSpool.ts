import { ServerSpool } from '@fabrix/fabrix/dist/common/spools/server'
import { isArray } from 'lodash'
import { Polka } from 'polka'

import { Server } from './server'
import { Validator } from './validator'

import * as config from './config/index'
import * as pkg from '../package.json'
import * as api  from './api/index'


/**
 * Polka spool
 *
 * @class Polka
 * @see {@link http://fabrix.app/doc/spool}
 *
 * Bind application routes to Polka.js (from spool-router)
 */
export class PolkaSpool extends ServerSpool {
  public server: Polka

  constructor(app) {
    super(app, {
      config: config,
      pkg: pkg,
      api: api
    })
  }

  /**
   * Ensure that config/web is valid, and that no other competing web
   * server spools are installed (e.g. polka)
   */
  async validate () {
    const requiredSpools = ['router', 'i18n']
    const spools = Object.keys(this.app.spools)

    if (!spools.some(v => requiredSpools.indexOf(v) >= 0)) {
      return Promise.reject(new Error(`spool-polka requires spools: ${ requiredSpools.join(', ') }!`))
    }
    if (!this.app.config.get('web.polka')) {
      return Promise.reject(
        new Error(
          'config.web.polka is absent, '
          + 'please npm install your polka version (4 or 5) and uncomment the line under config.web.polka'
        )
      )
    }
    return Promise.all([
      Validator.validateWebConfig(this.app.config.get('web'))
    ])
  }

  configure () {
    this.app.config.set('web.server', 'polka')
  }

  /**
   * Start Polka Server
   */
  async initialize () {

    this.server = Server.createServer(this.app)

    return Promise.all([
      Server.registerMiddlewares(this.app, this.server),
      Server.registerViews(this.app, this.server)
    ])
      .then(() => {
        return Server.start(this.app, this.server)
      })
      .then(() => {
        this.app.emit('webserver:http:ready', Server.nativeServer)
        return
      })
  }

  /**
   * Stops the Server(s)
   */
  async unload () {
    if (Server.nativeServer === null) {
      return
    }
    else if (isArray(Server.nativeServer)) {
      Server.nativeServer.forEach(server => {
        server.close()
      })
    }
    else {
      Server.nativeServer.close()
    }
    return Promise.resolve()
  }

  /**
   *
   */
  sanity() {
    if (!(this.app.routes instanceof Object)) {
      throw new Error('Sanity Failed: app.routes is not an object!')
    }
  }
}
