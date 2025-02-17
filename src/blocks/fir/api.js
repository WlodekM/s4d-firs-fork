import * as Blockly from "blockly/core";


const blockName = "fir_api";

const blockData = {
    "message0": "Send %1 image",
    "args0": [{
      "type": "field_input",
      "name": "TYPE",
      "text": "fox"
    }],
    "colour": "#D14081",
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "Use S4D APIs' animal pictue feature",
    "helpUrl": "https://s4d-apis.fakefurry.repl.co/api"
};

Blockly.Blocks[blockName] = {
    init: function() {
        this.jsonInit(blockData);
    }
};

Blockly.JavaScript[blockName] = function(block) {
    
    var text_type = block.getFieldValue('TYPE');
    text_type = encodeURIComponent(text_type.toLowerCase());
    
    const code = `
    https.get('https://s4d-apis.fakefurry.repl.co/api/animals/${text_type}', async resp => {
            let data2 = "";
            resp.on("data", async chunk => {
                data2 += chunk;
            });
            resp.on("end", async () => {
                let data = JSON.parse(data2)
                s4dmessage.channel.send({
                    content: String((data.link))
                });

            });
        })
        .on("error", async err => {
            console.log("Error: " + err.message);
        });`;
    return code;
};
