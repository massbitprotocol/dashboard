export const DEFAULT_TEMPLATE_BLOCK = {
  MAPPING:
    "use crate::models::BlockTs;\n" +
    "use massbit_chain_substrate::data_type::{SubstrateBlock, SubstrateUncheckedExtrinsic, SubstrateEventRecord};\n" +
    "\n" +
    "pub fn handle_block(block: &SubstrateBlock) -> Result<(), Box<dyn std::error::Error>> {\n" +
    '    println!("[SO File] Received Block");\n' +
    "    let block_ts = BlockTs {\n" +
    "        block_hash: block.block.header.hash().to_string(),\n" +
    "        block_height: block.block.header.number as i64,\n" +
    "    };\n" +
    "    block_ts.save();\n" +
    "    Ok(())\n" +
    "}\n" +
    "\n" +
    "pub fn handle_extrinsic(extrinsic: &SubstrateUncheckedExtrinsic) -> Result<(), Box<dyn std::error::Error>> {\n" +
    "    Ok(())\n" +
    "}\n" +
    "\n" +
    "pub fn handle_event(event: &SubstrateEventRecord) -> Result<(), Box<dyn std::error::Error>> {\n" +
    "    Ok(())\n" +
    "}\n",
  MODELS:
    "use crate::STORE;\n" +
    "use structmap::{FromMap, ToMap};\n" +
    "use structmap_derive::{FromMap, ToMap};\n" +
    "\n" +
    "#[derive(Default, Clone, FromMap, ToMap)]\n" +
    "pub struct BlockTs {\n" +
    "    pub block_hash: String,\n" +
    "    pub block_height: i64,\n" +
    "}\n" +
    "\n" +
    "impl Into<structmap::GenericMap> for BlockTs {\n" +
    "    fn into(self) -> structmap::GenericMap {\n" +
    "        BlockTs::to_genericmap(self.clone())\n" +
    "    }\n" +
    "}\n" +
    "\n" +
    "impl BlockTs {\n" +
    "    pub fn save(&self) {\n" +
    "        unsafe {\n" +
    "            STORE\n" +
    "                .as_ref()\n" +
    "                .unwrap()\n" +
    '                .save("BlockTs".to_string(), self.clone().into());\n' +
    "        }\n" +
    "    }\n" +
    "}\n" +
    "",
  PROJECT:
    "schema:\n" +
    "  file: ./schema.graphql\n" +
    "\n" +
    "dataSources:\n" +
    "  - kind: substrate\n" +
    "    name: Index\n" +
    "    network: https://data-seed-prebsc-1-s1.binance.org:8545/\n" +
    "    mapping:\n" +
    "      language: rust\n" +
    "      handlers:\n" +
    "        - handler: handleBlock\n" +
    "          kind: substrate/BlockHandler\n" +
    "        - handler: handleCall\n" +
    "          kind: substrate/CallHandler\n" +
    "        - handler: handleEvent\n" +
    '          kind: substrate/EventHandler",\n',
  UP:
    "CREATE TABLE BlockTs (\n" +
    "    block_hash varchar,\n" +
    "    block_height bigint\n" +
    ")",
  TABLE: "BlockTs"
};
export const DEFAULT_TEMPLATE_EVENT = {
  MAPPING:
    "use crate::models::EventTs;\n" +
    "use massbit_chain_substrate::data_type::{SubstrateEventRecord, SubstrateUncheckedExtrinsic, SubstrateBlock};\n" +
    "use chrono;\n" +
    "\n" +
    "pub fn handle_event(event: &SubstrateEventRecord) -> Result<(), Box<dyn std::error::Error>> {\n" +
    '    println!("[SO File] Received Event");\n' +
    "    let event_ts = EventTs {\n" +
    '        event: format!("{:?}", event.event),\n' +
    '        timestamp: format!("{:?}", chrono::offset::Utc::now()),\n' +
    "    };\n" +
    "    event_ts.save();\n" +
    "    Ok(())\n" +
    "}\n" +
    "\n" +
    "pub fn handle_extrinsic(extrinsic: &SubstrateUncheckedExtrinsic) -> Result<(), Box<dyn std::error::Error>> {\n" +
    "    Ok(())\n" +
    "}\n" +
    "\n" +
    "pub fn handle_block(block: &SubstrateBlock) -> Result<(), Box<dyn std::error::Error>> {\n" +
    "    Ok(())\n" +
    "}\n" +
    "\n" +
    "\n" +
    "",
  MODELS:
    "use crate::STORE;\n" +
    "use structmap::{FromMap, ToMap};\n" +
    "use structmap_derive::{FromMap, ToMap};\n" +
    "\n" +
    "#[derive(Default, Clone, FromMap, ToMap)]\n" +
    "pub struct EventTs {\n" +
    "    pub event: String,\n" +
    "    pub timestamp: String,\n" +
    "}\n" +
    "\n" +
    "impl Into<structmap::GenericMap> for EventTs {\n" +
    "    fn into(self) -> structmap::GenericMap {\n" +
    "        EventTs::to_genericmap(self.clone())\n" +
    "    }\n" +
    "}\n" +
    "\n" +
    "impl EventTs {\n" +
    "    pub fn save(&self) {\n" +
    "        unsafe {\n" +
    "            STORE\n" +
    "                .as_ref()\n" +
    "                .unwrap()\n" +
    '                .save("EventTs".to_string(), self.clone().into());\n' +
    "        }\n" +
    "    }\n" +
    "}\n" +
    "",
  PROJECT:
    "schema:\n" +
    "  file: ./schema.graphql\n" +
    "\n" +
    "dataSources:\n" +
    "  - kind: substrate\n" +
    "    name: Index",
  UP:
    "CREATE TABLE EventTs (\n" +
    "    timestamp varchar,\n" +
    "    event varchar\n" +
    ")",
  TABLE: "EventTs"
};

export const DEFAULT_TEMPLATE_EXTRINSIC = {
  MAPPING:
    "use crate::models::ExtrinsicTs;\n" +
    "use massbit_chain_substrate::data_type::{SubstrateUncheckedExtrinsic, SubstrateEventRecord, SubstrateBlock};\n" +
    "\n" +
    "pub fn handle_extrinsic(extrinsic: &SubstrateUncheckedExtrinsic) -> Result<(), Box<dyn std::error::Error>> {\n" +
    '    println!("[SO File] Received Extrinsic");\n' +
    '    let string_extrinsic = format!("{:?}", extrinsic.extrinsic);\n' +
    "    let extrinsic_ts = ExtrinsicTs {\n" +
    "        block_number: extrinsic.block_number as i64,\n" +
    "        extrinsic: string_extrinsic,\n" +
    "    };\n" +
    "    extrinsic_ts.save();\n" +
    "    Ok(())\n" +
    "}\n" +
    "\n" +
    "pub fn handle_event(event: &SubstrateEventRecord) -> Result<(), Box<dyn std::error::Error>> {\n" +
    "    Ok(())\n" +
    "}\n" +
    "\n" +
    "pub fn handle_block(block: &SubstrateBlock) -> Result<(), Box<dyn std::error::Error>> {\n" +
    "    Ok(())\n" +
    "}\n" +
    "",
  MODELS:
    "use crate::STORE;\n" +
    "use structmap::{FromMap, ToMap};\n" +
    "use structmap_derive::{FromMap, ToMap};\n" +
    "\n" +
    "#[derive(Default, Clone, FromMap, ToMap)]\n" +
    "pub struct ExtrinsicTs {\n" +
    "    pub block_number: i64,\n" +
    "    pub extrinsic: String,\n" +
    "}\n" +
    "\n" +
    "impl Into<structmap::GenericMap> for ExtrinsicTs {\n" +
    "    fn into(self) -> structmap::GenericMap {\n" +
    "        ExtrinsicTs::to_genericmap(self.clone())\n" +
    "    }\n" +
    "}\n" +
    "\n" +
    "impl ExtrinsicTs {\n" +
    "    pub fn save(&self) {\n" +
    "        unsafe {\n" +
    "            STORE\n" +
    "                .as_ref()\n" +
    "                .unwrap()\n" +
    '                .save("ExtrinsicTs".to_string(), self.clone().into());\n' +
    "        }\n" +
    "    }\n" +
    "}\n" +
    "",
  PROJECT:
    "schema:\n" +
    "  file: ./schema.graphql\n" +
    "\n" +
    "dataSources:\n" +
    "  - kind: substrate\n" +
    "    name: Index",
  UP:
    "CREATE TABLE ExtrinsicTs (\n" +
    "    block_number bigint,\n" +
    "    extrinsic varchar\n" +
    ")",
  TABLE: "ExtrinsicTs"
};
