OMA Lightweight M2M IoT Agent
==================

# Overview
## Description
An Internet of Things Agent is a component that lets groups of devices send their data to and be managed from a FIWARE NGSI Context Broker using their own native protocols. This project provides the IoT Agent for the Lightweight M2M protocol, i.e. the bridge between OMA Lightweight M2M enabled devices and a NGSI Context Broker. For more information on what an IoT Agent is or how it should work, please check the documentation on the [Node IoT Agent Library](https://github.com/telefonicaid/iotagent-node-lib).

## Type configuration
In order to assign the proper configuration for each type of device, a mechanism to assign types to new arriving devices should be used. This mechanism is based on Prefixes for the registrarion URL. For each type configured in the `lwm2m` configuration section in the `config.js` config file, a url prefix has to be defined. Whenever a registration arrives to an url with that prefix, the device will be assigned the corresponding type.

## Mappings
One of the features to provide through the IoT Agent is the mapping between the protocol specific names of the South Bound to the application-specific names in the North Bound. In the case of Lightweight M2M, this means to map two things:
* OMA Registry objects and resources from their URIs (e.g.: '') to their common names (e.g.: '').
* Custom device objects to the names defined by the user.

In order to accomplish this task, the agent supports:
* An aditional property `lwm2mResourceMapping` that lets the user configure names for to each of the particular resources exposed by a device Type
* Two optional configuration file, `omaRegistry.json` containing the automatic mappings that will be applied in case there are no custom mappings.

Custom mappings defined by the user in the config.js file or by preprovisioning devices take precedence over any other available mapping.

### OMA Registry mapping
The IoT Agent provides a mean to map Lightweight M2M objects supported by the client without the need to map them in the type or prevoprovision information. The mapping works as follows: whenever a device registration arrives to the IoT Agent **if there is no configured mapping for any of the objects supported by the decive** (that should appear in the registration payload), then **all the resources supported by the object in the OMA Registry** are configured **as passive resources** offered by the object.

The OMA Registry information is read from two files: `omaRegistryMap.json` and `omaRegistryInverseMap.json`. This two files can be generated with the last information in the OMA Registry with the command `bin/downloadOmaRegistry.js`. Notice that the generated files **do not** have the same name than the original ones (so the result can be double-checked before changing them). In order to use the freshly downloaded ones, just remove the former and rename the latter.

## Preprovisioning
For individual provisioning of devices, LWM2M devices can be preprovisioned to the server, sending all the required information to the IoT Agent Provisioning API. Preprovisioned devices should target the standard '/rd' url instead of a type url. The preprovision configuration will be identified by the Endpoint name sent by the device.

## A note about security
IoT Agent security is still in development, so no Southbound or Northbound security mechanisms are provided. The NGSI Context Broker can be secured with a [PEP Proxy]() anyway, so the IoT Agent should be able to deal with token based security. This mechanism is achieved with the use of Keystone Trust Tokens. For more information on how to use them, please read the Security Section in [Node IoT Agent Library](https://github.com/telefonicaid/iotagent-node-lib).

# Installation
This IoT Agent is currently under development, so the only way to install it is cloning the repository. Once the repository is cloned, download the dependencies with `npm install` and the installation will be completed.

# Usage

# Configuration

# Testing
The IoT Agent comes with a test suite to check the main functionalities. In order to execute the test suite you must have the Grunt client installed. You can install it using the following command (you will need root permissions):
```
npm install -g grunt-cli
```
Once the client is installed and the dependencies are downloaded, you can execute the tests using:
```
grunt
```
This will execute the functional tests and the syntax checking as well.

NOTE: This are end to end tests, so they execute against real instances of the components (so make sure you have a real Context Broker configured in the config.js). Be aware that the tests clean the databases before and after they have been executed so DO NOT EXECUTE THIS TESTS ON PRODUCTION MACHINES.
