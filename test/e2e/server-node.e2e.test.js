/**
 * Copyright (c) 2018,2019 Bianco Royal Software Innovations(R) (https://bianco-royal.cloud/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

jest.setTimeout(20000);

describe("opcua-compact-server node", function() {
  const injectNode = require("node-red/nodes/core/core/20-inject");
  const functionNode = require("node-red/nodes/core/core/80-function");
  const debugMsgNode = require("node-red/nodes/core/core/58-debug");
  const helper = require("node-red-node-test-helper");
  helper.init(require.resolve("node-red"));
  const nut = require("../../src/server-node");
  const serverTestNodes = [injectNode, functionNode, debugMsgNode, nut];
  let flow;

  beforeAll(done => {
    flow = [
      {
        id: "c02f97d3.9d7a7",
        type: "opcua-compact-server",
        z: "a4ece67a.77d768",
        port: 54846,
        endpoint: "",
        acceptExternalCommands: true,
        maxAllowedSessionNumber: "",
        maxConnectionsPerEndpoint: "",
        maxAllowedSubscriptionNumber: "",
        alternateHostname: "",
        name: "Compact-Server",
        showStatusActivities: false,
        showErrors: true,
        allowAnonymous: true,
        individualCerts: false,
        isAuditing: false,
        serverDiscovery: true,
        users: [
          {
            name: "bianco",
            password: "royal"
          }
        ],
        xmlsets: [
          {
            name: "",
            path: "public/vendor/harting/10_di.xml"
          },
          {
            name: "",
            path: "public/vendor/harting/20_autoid.xml"
          },
          {
            name: "",
            path: "public/vendor/harting/30_aim.xml"
          }
        ],
        publicCertificateFile: "",
        privateCertificateFile: "",
        registerServerMethod: 3,
        discoveryServerEndpointUrl: "",
        capabilitiesForMDNS: "",
        maxNodesPerRead: 1000,
        maxNodesPerWrite: 1000,
        maxNodesPerHistoryReadData: 100,
        maxNodesPerBrowse: 3000,
        delayToInit: 200,
        delayToClose: 400,
        serverShutdownTimeout: 300,
        addressSpaceScript:
          'function constructAlarmAddressSpace(server, addressSpace, eventObjects, done) {\n  // server = the created node-opcua server\n  // addressSpace = address space of the node-opcua server\n  // eventObjects = add event variables here to hold them in memory from this script\n\n  // internal sandbox objects are:\n  // node = the compact server node,\n  // coreServer = core compact server object for debug and access to NodeOPCUA\n  // this.sandboxNodeContext = node context node-red\n  // this.sandboxFlowContext = flow context node-red\n  // this.sandboxGlobalContext = global context node-red\n  // this.sandboxEnv = env variables\n  // timeout and interval functions as expected from nodejs\n\n  const opcua = coreServer.choreCompact.opcua;\n  const LocalizedText = opcua.LocalizedText;\n  const namespace = addressSpace.getOwnNamespace();\n\n  const Variant = opcua.Variant;\n  const DataType = opcua.DataType;\n  const DataValue = opcua.DataValue;\n\n  var flexServerInternals = this;\n\n  this.sandboxFlowContext.set("isoInput1", 0);\n  this.setInterval(() => {\n    flexServerInternals.sandboxFlowContext.set(\n      "isoInput1",\n      Math.random() + 50.0\n    );\n  }, 500);\n  this.sandboxFlowContext.set("isoInput2", 0);\n  this.sandboxFlowContext.set("isoInput3", 0);\n  this.sandboxFlowContext.set("isoInput4", 0);\n  this.sandboxFlowContext.set("isoInput5", 0);\n  this.sandboxFlowContext.set("isoInput6", 0);\n  this.sandboxFlowContext.set("isoInput7", 0);\n  this.sandboxFlowContext.set("isoInput8", 0);\n\n  this.sandboxFlowContext.set("isoOutput1", 0);\n  this.setInterval(() => {\n    flexServerInternals.sandboxFlowContext.set(\n      "isoOutput1",\n      Math.random() + 10.0\n    );\n  }, 500);\n\n  this.sandboxFlowContext.set("isoOutput2", 0);\n  this.sandboxFlowContext.set("isoOutput3", 0);\n  this.sandboxFlowContext.set("isoOutput4", 0);\n  this.sandboxFlowContext.set("isoOutput5", 0);\n  this.sandboxFlowContext.set("isoOutput6", 0);\n  this.sandboxFlowContext.set("isoOutput7", 0);\n  this.sandboxFlowContext.set("isoOutput8", 0);\n\n  coreServer.debugLog("init dynamic address space");\n  const rootFolder = addressSpace.findNode("RootFolder");\n\n  node.warn("construct new address space for OPC UA");\n\n  const myDevice = namespace.addFolder(rootFolder.objects, {\n    "browseName": "RaspberryPI-Zero-WLAN"\n  });\n  const gpioFolder = namespace.addFolder(myDevice, { "browseName": "GPIO" });\n  const isoInputs = namespace.addFolder(gpioFolder, {\n    "browseName": "Inputs"\n  });\n  const isoOutputs = namespace.addFolder(gpioFolder, {\n    "browseName": "Outputs"\n  });\n\n  const gpioDI1 = namespace.addVariable({\n    "organizedBy": isoInputs,\n    "browseName": "I1",\n    "nodeId": "ns=1;s=Isolated_Input1",\n    "dataType": "Double",\n    "value": {\n      "get": function() {\n        return new Variant({\n          "dataType": DataType.Double,\n          "value": flexServerInternals.sandboxFlowContext.get("isoInput1")\n        });\n      },\n      "set": function(variant) {\n        flexServerInternals.sandboxFlowContext.set(\n          "isoInput1",\n          parseFloat(variant.value)\n        );\n        return opcua.StatusCodes.Good;\n      }\n    }\n  });\n\n  const gpioDI2 = namespace.addVariable({\n    "organizedBy": isoInputs,\n    "browseName": "I2",\n    "nodeId": "ns=1;s=Isolated_Input2",\n    "dataType": "Double",\n    "value": {\n      "get": function() {\n        return new Variant({\n          "dataType": DataType.Double,\n          "value": flexServerInternals.sandboxFlowContext.get("isoInput2")\n        });\n      },\n      "set": function(variant) {\n        flexServerInternals.sandboxFlowContext.set(\n          "isoInput2",\n          parseFloat(variant.value)\n        );\n        return opcua.StatusCodes.Good;\n      }\n    }\n  });\n\n  const gpioDI3 = namespace.addVariable({\n    "organizedBy": isoInputs,\n    "browseName": "I3",\n    "nodeId": "ns=1;s=Isolated_Input3",\n    "dataType": "Double",\n    "value": {\n      "get": function() {\n        return new Variant({\n          "dataType": DataType.Double,\n          "value": flexServerInternals.sandboxFlowContext.get("isoInput3")\n        });\n      },\n      "set": function(variant) {\n        flexServerInternals.sandboxFlowContext.set(\n          "isoInput3",\n          parseFloat(variant.value)\n        );\n        return opcua.StatusCodes.Good;\n      }\n    }\n  });\n\n  const gpioDI4 = namespace.addVariable({\n    "organizedBy": isoInputs,\n    "browseName": "I4",\n    "nodeId": "ns=1;s=Isolated_Input4",\n    "dataType": "Double",\n    "value": {\n      "get": function() {\n        return new Variant({\n          "dataType": DataType.Double,\n          "value": flexServerInternals.sandboxFlowContext.get("isoInput4")\n        });\n      },\n      "set": function(variant) {\n        flexServerInternals.sandboxFlowContext.set(\n          "isoInput4",\n          parseFloat(variant.value)\n        );\n        return opcua.StatusCodes.Good;\n      }\n    }\n  });\n\n  const gpioDI5 = namespace.addVariable({\n    "organizedBy": isoInputs,\n    "browseName": "I5",\n    "nodeId": "ns=1;s=Isolated_Input5",\n    "dataType": "Double",\n    "value": {\n      "get": function() {\n        return new Variant({\n          "dataType": DataType.Double,\n          "value": flexServerInternals.sandboxFlowContext.get("isoInput5")\n        });\n      },\n      "set": function(variant) {\n        flexServerInternals.sandboxFlowContext.set(\n          "isoInput5",\n          parseFloat(variant.value)\n        );\n        return opcua.StatusCodes.Good;\n      }\n    }\n  });\n\n  const gpioDI6 = namespace.addVariable({\n    "organizedBy": isoInputs,\n    "browseName": "I6",\n    "nodeId": "ns=1;s=Isolated_Input6",\n    "dataType": "Double",\n    "value": {\n      "get": function() {\n        return new Variant({\n          "dataType": DataType.Double,\n          "value": flexServerInternals.sandboxFlowContext.get("isoInput6")\n        });\n      },\n      "set": function(variant) {\n        flexServerInternals.sandboxFlowContext.set(\n          "isoInput6",\n          parseFloat(variant.value)\n        );\n        return opcua.StatusCodes.Good;\n      }\n    }\n  });\n\n  const gpioDI7 = namespace.addVariable({\n    "organizedBy": isoInputs,\n    "browseName": "I7",\n    "nodeId": "ns=1;s=Isolated_Input7",\n    "dataType": "Double",\n    "value": {\n      "get": function() {\n        return new Variant({\n          "dataType": DataType.Double,\n          "value": flexServerInternals.sandboxFlowContext.get("isoInput7")\n        });\n      },\n      "set": function(variant) {\n        flexServerInternals.sandboxFlowContext.set(\n          "isoInput7",\n          parseFloat(variant.value)\n        );\n        return opcua.StatusCodes.Good;\n      }\n    }\n  });\n\n  const gpioDI8 = namespace.addVariable({\n    "organizedBy": isoInputs,\n    "browseName": "I8",\n    "nodeId": "ns=1;s=Isolated_Input8",\n    "dataType": "Double",\n    "value": {\n      "get": function() {\n        return new Variant({\n          "dataType": DataType.Double,\n          "value": flexServerInternals.sandboxFlowContext.get("isoInput8")\n        });\n      },\n      "set": function(variant) {\n        flexServerInternals.sandboxFlowContext.set(\n          "isoInput8",\n          parseFloat(variant.value)\n        );\n        return opcua.StatusCodes.Good;\n      }\n    }\n  });\n\n  const gpioDO1 = namespace.addVariable({\n    "organizedBy": isoOutputs,\n    "browseName": "O1",\n    "nodeId": "ns=1;s=Isolated_Output1",\n    "dataType": "Double",\n    "value": {\n      "get": function() {\n        return new Variant({\n          "dataType": DataType.Double,\n          "value": flexServerInternals.sandboxFlowContext.get("isoOutput1")\n        });\n      },\n      "set": function(variant) {\n        flexServerInternals.sandboxFlowContext.set(\n          "isoOutput1",\n          parseFloat(variant.value)\n        );\n        return opcua.StatusCodes.Good;\n      }\n    }\n  });\n\n  const gpioDO2 = namespace.addVariable({\n    "organizedBy": isoOutputs,\n    "browseName": "O2",\n    "nodeId": "ns=1;s=Isolated_Output2",\n    "dataType": "Double",\n    "value": {\n      "get": function() {\n        return new Variant({\n          "dataType": DataType.Double,\n          "value": flexServerInternals.sandboxFlowContext.get("isoOutput2")\n        });\n      },\n      "set": function(variant) {\n        flexServerInternals.sandboxFlowContext.set(\n          "isoOutput2",\n          parseFloat(variant.value)\n        );\n        return opcua.StatusCodes.Good;\n      }\n    }\n  });\n\n  const gpioDO3 = namespace.addVariable({\n    "organizedBy": isoOutputs,\n    "browseName": "O3",\n    "nodeId": "ns=1;s=Isolated_Output3",\n    "dataType": "Double",\n    "value": {\n      "get": function() {\n        return new Variant({\n          "dataType": DataType.Double,\n          "value": flexServerInternals.sandboxFlowContext.get("isoOutput3")\n        });\n      },\n      "set": function(variant) {\n        flexServerInternals.sandboxFlowContext.set(\n          "isoOutput3",\n          parseFloat(variant.value)\n        );\n        return opcua.StatusCodes.Good;\n      }\n    }\n  });\n\n  const gpioDO4 = namespace.addVariable({\n    "organizedBy": isoOutputs,\n    "browseName": "O4",\n    "nodeId": "ns=1;s=Isolated_Output4",\n    "dataType": "Double",\n    "value": {\n      "get": function() {\n        return new Variant({\n          "dataType": DataType.Double,\n          "value": flexServerInternals.sandboxFlowContext.get("isoOutput4")\n        });\n      },\n      "set": function(variant) {\n        flexServerInternals.sandboxFlowContext.set(\n          "isoOutput4",\n          parseFloat(variant.value)\n        );\n        return opcua.StatusCodes.Good;\n      }\n    }\n  });\n\n  const gpioDO5 = namespace.addVariable({\n    "organizedBy": isoOutputs,\n    "browseName": "O5",\n    "nodeId": "ns=1;s=Isolated_Output5",\n    "dataType": "Double",\n    "value": {\n      "get": function() {\n        return new Variant({\n          "dataType": DataType.Double,\n          "value": flexServerInternals.sandboxFlowContext.get("isoOutput5")\n        });\n      },\n      "set": function(variant) {\n        flexServerInternals.sandboxFlowContext.set(\n          "isoOutput5",\n          parseFloat(variant.value)\n        );\n        return opcua.StatusCodes.Good;\n      }\n    }\n  });\n\n  const gpioDO6 = namespace.addVariable({\n    "organizedBy": isoOutputs,\n    "browseName": "O6",\n    "nodeId": "ns=1;s=Isolated_Output6",\n    "dataType": "Double",\n    "value": {\n      "get": function() {\n        return new Variant({\n          "dataType": DataType.Double,\n          "value": flexServerInternals.sandboxFlowContext.get("isoOutput6")\n        });\n      },\n      "set": function(variant) {\n        flexServerInternals.sandboxFlowContext.set(\n          "isoOutput6",\n          parseFloat(variant.value)\n        );\n        return opcua.StatusCodes.Good;\n      }\n    }\n  });\n\n  const gpioDO7 = namespace.addVariable({\n    "organizedBy": isoOutputs,\n    "browseName": "O7",\n    "nodeId": "ns=1;s=Isolated_Output7",\n    "dataType": "Double",\n    "value": {\n      "get": function() {\n        return new Variant({\n          "dataType": DataType.Double,\n          "value": flexServerInternals.sandboxFlowContext.get("isoOutput7")\n        });\n      },\n      "set": function(variant) {\n        flexServerInternals.sandboxFlowContext.set(\n          "isoOutput7",\n          parseFloat(variant.value)\n        );\n        return opcua.StatusCodes.Good;\n      }\n    }\n  });\n\n  const gpioDO8 = namespace.addVariable({\n    "organizedBy": isoOutputs,\n    "browseName": "O8",\n    "nodeId": "ns=1;s=Isolated_Output8",\n    "dataType": "Double",\n    "value": {\n      "get": function() {\n        return new Variant({\n          "dataType": DataType.Double,\n          "value": flexServerInternals.sandboxFlowContext.get("isoOutput8")\n        });\n      },\n      "set": function(variant) {\n        flexServerInternals.sandboxFlowContext.set(\n          "isoOutput8",\n          parseFloat(variant.value)\n        );\n        return opcua.StatusCodes.Good;\n      }\n    }\n  });\n\n  //------------------------------------------------------------------------------\n  // Add a view\n  //------------------------------------------------------------------------------\n  const viewDI = namespace.addView({\n    "organizedBy": rootFolder.views,\n    "browseName": "RPIW0-Digital-Ins"\n  });\n\n  const viewDO = namespace.addView({\n    "organizedBy": rootFolder.views,\n    "browseName": "RPIW0-Digital-Outs"\n  });\n\n  viewDI.addReference({\n    "referenceType": "Organizes",\n    "nodeId": gpioDI1.nodeId\n  });\n\n  viewDI.addReference({\n    "referenceType": "Organizes",\n    "nodeId": gpioDI2.nodeId\n  });\n\n  viewDI.addReference({\n    "referenceType": "Organizes",\n    "nodeId": gpioDI3.nodeId\n  });\n\n  viewDI.addReference({\n    "referenceType": "Organizes",\n    "nodeId": gpioDI4.nodeId\n  });\n\n  viewDI.addReference({\n    "referenceType": "Organizes",\n    "nodeId": gpioDI5.nodeId\n  });\n\n  viewDI.addReference({\n    "referenceType": "Organizes",\n    "nodeId": gpioDI6.nodeId\n  });\n\n  viewDI.addReference({\n    "referenceType": "Organizes",\n    "nodeId": gpioDI7.nodeId\n  });\n\n  viewDI.addReference({\n    "referenceType": "Organizes",\n    "nodeId": gpioDI8.nodeId\n  });\n\n  viewDO.addReference({\n    "referenceType": "Organizes",\n    "nodeId": gpioDO1.nodeId\n  });\n\n  viewDO.addReference({\n    "referenceType": "Organizes",\n    "nodeId": gpioDO2.nodeId\n  });\n\n  viewDO.addReference({\n    "referenceType": "Organizes",\n    "nodeId": gpioDO3.nodeId\n  });\n\n  viewDO.addReference({\n    "referenceType": "Organizes",\n    "nodeId": gpioDO4.nodeId\n  });\n\n  viewDO.addReference({\n    "referenceType": "Organizes",\n    "nodeId": gpioDO5.nodeId\n  });\n\n  viewDO.addReference({\n    "referenceType": "Organizes",\n    "nodeId": gpioDO6.nodeId\n  });\n\n  viewDO.addReference({\n    "referenceType": "Organizes",\n    "nodeId": gpioDO7.nodeId\n  });\n\n  viewDO.addReference({\n    "referenceType": "Organizes",\n    "nodeId": gpioDO8.nodeId\n  });\n\n  coreServer.debugLog("create dynamic address space done");\n  node.warn("construction of new address space for OPC UA done");\n\n  done();\n}\n',
        x: 1010,
        y: 180,
        wires: []
      },
      {
        id: "f70e8f28.60444",
        type: "inject",
        z: "a4ece67a.77d768",
        name: "",
        topic: "",
        payload: "",
        payloadType: "date",
        repeat: "1",
        crontab: "",
        once: true,
        onceDelay: "0.5",
        x: 230,
        y: 120,
        wires: [["73868f2b.712b5"]]
      },
      {
        id: "73868f2b.712b5",
        type: "function",
        z: "a4ece67a.77d768",
        name: "set flow context Inputs",
        func:
          "// flow.set('isoInput1', Math.random() + 11.0) interval comes from server\nflow.set('isoInput2', Math.random() + 12.0)\nflow.set('isoInput3', Math.random() + 13.0)\nflow.set('isoInput4', Math.random() + 14.0)\nflow.set('isoInput5', Math.random() + 15.0)\nflow.set('isoInput6', Math.random() + 16.0)\nflow.set('isoInput7', Math.random() + 17.0)\nflow.set('isoInput8', Math.random() + 18.0)\n\nmsg.payload = [\n    flow.get('isoInput1'),\n    flow.get('isoInput2'),\n    flow.get('isoInput3'),\n    flow.get('isoInput4'),\n    flow.get('isoInput5'),\n    flow.get('isoInput6'),\n    flow.get('isoInput7'),\n    flow.get('isoInput8'),\n]\nreturn msg;",
        outputs: 1,
        noerr: 0,
        x: 470,
        y: 120,
        wires: [["f09d3e59.8dd7a8"]]
      },
      {
        id: "f09d3e59.8dd7a8",
        type: "debug",
        z: "a4ece67a.77d768",
        name: "",
        active: false,
        tosidebar: true,
        console: false,
        tostatus: false,
        complete: "false",
        x: 720,
        y: 120,
        wires: []
      },
      {
        id: "ab32f6dd.e33b2",
        type: "function",
        z: "a4ece67a.77d768",
        name: "set flow context Outputs",
        func:
          "// flow.set('isoOutput1', Math.random() + 1.0) interval comes from server\nflow.set('isoOutput2', Math.random() + 2.0)\nflow.set('isoOutput3', Math.random() + 3.0)\nflow.set('isoOutput4', Math.random() + 4.0)\nflow.set('isoOutput5', Math.random() + 5.0)\nflow.set('isoOutput6', Math.random() + 6.0)\nflow.set('isoOutput7', Math.random() + 7.0)\nflow.set('isoOutput8', Math.random() + 8.0)\n\nmsg.payload = [\n    flow.get('isoOutput1'),\n    flow.get('isoOutput2'),\n    flow.get('isoOutput3'),\n    flow.get('isoOutput4'),\n    flow.get('isoOutput5'),\n    flow.get('isoOutput6'),\n    flow.get('isoOutput7'),\n    flow.get('isoOutput8'),\n]\nreturn msg;",
        outputs: 1,
        noerr: 0,
        x: 480,
        y: 180,
        wires: [["89ec462e.72898"]]
      },
      {
        id: "2a8396af.b4fe8a",
        type: "inject",
        z: "a4ece67a.77d768",
        name: "",
        topic: "",
        payload: "",
        payloadType: "date",
        repeat: "1",
        crontab: "",
        once: true,
        onceDelay: "0.5",
        x: 230,
        y: 180,
        wires: [["ab32f6dd.e33b2"]]
      },
      {
        id: "89ec462e.72898",
        type: "debug",
        z: "a4ece67a.77d768",
        name: "",
        active: false,
        tosidebar: true,
        console: false,
        tostatus: false,
        complete: "false",
        x: 720,
        y: 180,
        wires: []
      },
      {
        id: "628c250f.308ee4",
        type: "function",
        z: "a4ece67a.77d768",
        name: "set flow context Analog",
        func:
          "flow.set('analogValue1', Math.random() + 3.0)\nflow.set('analogValue2', Math.random() + 5.0)\nflow.set('analogValue3', Math.random() + 8.0)\nflow.set('analogValue4', Math.random() + 16.0)\n\nmsg.payload = [\n    flow.get('analogValue1'),\n    flow.get('analogValue2'),\n    flow.get('analogValue3'),\n    flow.get('analogValue4')\n]\nreturn msg;",
        outputs: 1,
        noerr: 0,
        x: 480,
        y: 240,
        wires: [["4dfb8fb8.d76d"]]
      },
      {
        id: "2a21636a.62befc",
        type: "inject",
        z: "a4ece67a.77d768",
        name: "",
        topic: "",
        payload: "",
        payloadType: "date",
        repeat: "1",
        crontab: "",
        once: true,
        onceDelay: "0.5",
        x: 230,
        y: 240,
        wires: [["628c250f.308ee4"]]
      },
      {
        id: "4dfb8fb8.d76d",
        type: "debug",
        z: "a4ece67a.77d768",
        name: "",
        active: false,
        tosidebar: true,
        console: false,
        tostatus: false,
        complete: "false",
        x: 720,
        y: 240,
        wires: []
      }
    ];
    helper.startServer(done);
  });

  afterAll(done => {
    helper.stopServer(done);
  });

  afterEach(done => {
    helper.unload();
    done();
  });

  it("should be loaded with context and should update context", done => {
    helper.load(serverTestNodes, flow, function() {
      let n1 = helper.getNode("c02f97d3.9d7a7");
      expect(n1.name).toBe("Compact-Server");
      n1.on("server_node_error", err => {
        console.log(err);
      });
      n1.on("server_running", () => {
        setTimeout(done, 6000);
      });
    });
  });
});
