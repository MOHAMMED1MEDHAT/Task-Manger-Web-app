const Ajv=require('ajv');
const ajv=new Ajv();

const schema={
    "type":"object",
    "properties":{
        "tasks":{
            "type":"string"
        }
    },
    "required":["tasks"]
};

module.exports=ajv.compile(schema);