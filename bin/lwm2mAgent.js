#!/usr/bin/env node

/*
 * Copyright 2014 Telefonica Investigación y Desarrollo, S.A.U
 *
 * This file is part of lightweightM2M-iotagent
 *
 * lightweightM2M-iotagent is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * lightweightM2M-iotagent is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with lightweightM2M-iotagent.
 * If not, seehttp://www.gnu.org/licenses/.
 *
 * For those usages not covered by the GNU Affero General Public License
 * please contact with::[contacto@tid.es]
 */

const iotAgent = require('../lib/iotAgentLwm2m');
const iotAgentLib = require('iotagent-node-lib');
const info = require('../package.json');
const context = {
    op: 'IOTAgent.Executable'
};
const logger = require('logops');

function start() {
    let config;

    if (process.argv.length === 3) {
        config = require('../' + process.argv[2]);
    } else {
        config = require('../config');
    }

    config.ngsi.iotaVersion = info.version;

    iotAgentLib.startServer(config, iotAgent, function(error) {
        if (error) {
            logger.error(context, 'Error starting Agent: [%s] Exiting process', error);
        } else {
            logger.info(context, 'Lightweight M2M IoT Agent started');
        }
    });
}

start();
