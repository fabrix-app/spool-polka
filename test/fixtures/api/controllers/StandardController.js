'use strict'
require('@fabrix/fabrix')

/**
 * @module DefaultController
 *
 * @description Default Controller included with a new fabrix app
 * @see {@link http://fabrix.app/doc/api/controllers}
 * @this fabrixApp
 */
module.exports = class StandardController extends Controller {
  info(request, reply) {
    reply(this.app.services.DefaultService.getApplicationInfo())
  }

  intercept(request, reply) {
    reply(this.app.services.DefaultService.getApplicationInfo())
  }

}
