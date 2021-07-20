export const SOL_TEMPLATE_BLOCK = {
  MAPPING:
    "use crate::models::BlockSolanaTs;\n" +
    "use massbit_chain_solana::data_type::{\n" +
    "    SolanaBlock,\n" +
    "    SolanaTransaction,\n" +
    "    SolanaLogMessages\n" +
    "};\n" +
    "\n" +
    "pub fn handle_block(block: &SolanaBlock) -> Result<(), Box<dyn std::error::Error>> {\n" +
    '    println!("[SO File] Received Solana Block");\n' +
    "    let block_solana_ts = BlockSolanaTs {\n" +
    "        block_hash: block.block.blockhash.clone(),\n" +
    "        block_height: block.block.block_height.unwrap() as i64,\n" +
    "        timestamp: block.block.block_time.unwrap().to_string(),\n" +
    "    };\n" +
    "    block_solana_ts.save();\n" +
    "    Ok(())\n" +
    "}\n" +
    "\n" +
    "pub fn handle_transaction(transaction: &SolanaTransaction) -> Result<(), Box<dyn std::error::Error>> {\n" +
    "    Ok(())\n" +
    "}\n" +
    "\n" +
    "pub fn handle_log_messages(event: &SolanaLogMessages) -> Result<(), Box<dyn std::error::Error>> {\n" +
    "    Ok(())\n" +
    "}\n" +
    "",
  MODELS:
    "use crate::STORE;\n" +
    "use structmap::{FromMap, ToMap};\n" +
    "use structmap_derive::{FromMap, ToMap};\n" +
    "\n" +
    "#[derive(Default, Clone, FromMap, ToMap)]\n" +
    "pub struct BlockSolanaTs {\n" +
    "    pub block_hash: String,\n" +
    "    pub block_height: i64,\n" +
    "    pub timestamp: String\n" +
    "}\n" +
    "\n" +
    "impl Into<structmap::GenericMap> for BlockSolanaTs {\n" +
    "    fn into(self) -> structmap::GenericMap {\n" +
    "        BlockSolanaTs::to_genericmap(self.clone())\n" +
    "    }\n" +
    "}\n" +
    "\n" +
    "impl BlockSolanaTs {\n" +
    "    pub fn save(&self) {\n" +
    "        unsafe {\n" +
    "            STORE\n" +
    "                .as_ref()\n" +
    "                .unwrap()\n" +
    '                .save("BlockSolanaTs".to_string(), self.clone().into());\n' +
    "        }\n" +
    "    }\n" +
    "}\n" +
    "",
  PROJECT:
    "schema:\n" +
    "  file: ./schema.graphql\n" +
    "\n" +
    "dataSources:\n" +
    "  - kind: solana\n" +
    "    name: Index\n" +
    "    network: https://data-seed-prebsc-1-s1.binance.org:8545/\n" +
    "",
  UP:
    "CREATE TABLE BlockSolanaTs (\n" +
    "    block_hash varchar,\n" +
    "    block_height bigint,\n" +
    "    timestamp varchar\n" +
    ")",
  TABLE: "BlockSolanaTs",
  QUERY: ""
};
export const SOL_TEMPLATE_TRANS = {
  MAPPING:
    "use crate::models::TransactionSolanaTs;\n" +
    "use massbit_chain_solana::data_type::{\n" +
    "    SolanaBlock,\n" +
    "    SolanaTransaction,\n" +
    "    SolanaLogMessages\n" +
    "};\n" +
    "\n" +
    "pub fn handle_block(block: &SolanaBlock) -> Result<(), Box<dyn std::error::Error>> {\n" +
    "    Ok(())\n" +
    "}\n" +
    "\n" +
    "pub fn handle_transaction(transaction: &SolanaTransaction) -> Result<(), Box<dyn std::error::Error>> {\n" +
    '    println!("[SO File] Received Solana Transaction");\n' +
    "\n" +
    "    let transaction_solana_ts = TransactionSolanaTs {\n" +
    "        block_number: transaction.block_number as i64,\n" +
    "        fee: transaction.transaction.meta.clone().unwrap().fee as i64,\n" +
    '        signature: format!("{:?}", transaction.transaction.transaction.signatures),\n' +
    "    };\n" +
    "    transaction_solana_ts.save();\n" +
    "    Ok(())\n" +
    "}\n" +
    "\n" +
    "pub fn handle_log_messages(event: &SolanaLogMessages) -> Result<(), Box<dyn std::error::Error>> {\n" +
    "    Ok(())\n" +
    "}\n" +
    "",
  MODELS:
    "use crate::STORE;\n" +
    "use structmap::{FromMap, ToMap};\n" +
    "use structmap_derive::{FromMap, ToMap};\n" +
    "\n" +
    "#[derive(Default, Clone, FromMap, ToMap)]\n" +
    "pub struct TransactionSolanaTs {\n" +
    "    pub block_number: i64,\n" +
    "    pub fee: i64,\n" +
    "    pub signature: String\n" +
    "}\n" +
    "\n" +
    "impl Into<structmap::GenericMap> for TransactionSolanaTs {\n" +
    "    fn into(self) -> structmap::GenericMap {\n" +
    "        TransactionSolanaTs::to_genericmap(self.clone())\n" +
    "    }\n" +
    "}\n" +
    "\n" +
    "impl TransactionSolanaTs {\n" +
    "    pub fn save(&self) {\n" +
    "        unsafe {\n" +
    "            STORE\n" +
    "                .as_ref()\n" +
    "                .unwrap()\n" +
    '                .save("TransactionSolanaTs".to_string(), self.clone().into());\n' +
    "        }\n" +
    "    }\n" +
    "}\n" +
    "",
  PROJECT:
    "schema:\n" +
    "  file: ./schema.graphql\n" +
    "\n" +
    "dataSources:\n" +
    "  - kind: solana\n" +
    "    name: Index\n" +
    "    network: https://data-seed-prebsc-1-s1.binance.org:8545/\n" +
    "",
  UP:
    "CREATE TABLE TransactionSolanaTs (\n" +
    "    block_number bigint,\n" +
    "    fee bigint,\n" +
    "    signature varchar\n" +
    ")",
  TABLE: "TransactionSolanaTs",
  QUERY: ""
};
export const SOL_TEMPLATE_LOGS = {
  MAPPING:
    "use crate::models::LogMessagesSolanaTs;\n" +
    "use massbit_chain_solana::data_type::{\n" +
    "    SolanaBlock,\n" +
    "    SolanaTransaction,\n" +
    "    SolanaLogMessages\n" +
    "};\n" +
    "\n" +
    "pub fn handle_block(block: &SolanaBlock) -> Result<(), Box<dyn std::error::Error>> {\n" +
    "    Ok(())\n" +
    "}\n" +
    "\n" +
    "pub fn handle_transaction(transaction: &SolanaTransaction) -> Result<(), Box<dyn std::error::Error>> {\n" +
    "    Ok(())\n" +
    "}\n" +
    "\n" +
    "pub fn handle_log_messages(log_messages: &SolanaLogMessages) -> Result<(), Box<dyn std::error::Error>> {\n" +
    '    println!("[SO File] Received Solana Log Messages");\n' +
    "\n" +
    "    let log_messages_solana_ts = LogMessagesSolanaTs {\n" +
    "        block_number: log_messages.block_number as i64,\n" +
    '        log_messages: format!("{:?}", log_messages.log_messages),\n' +
    '        signature: format!("{:?}", log_messages.transaction.transaction.transaction.signatures),\n' +
    "    };\n" +
    "    log_messages_solana_ts.save();\n" +
    "    Ok(())\n" +
    "}\n" +
    "",
  MODELS:
    "use crate::STORE;\n" +
    "use structmap::{FromMap, ToMap};\n" +
    "use structmap_derive::{FromMap, ToMap};\n" +
    "\n" +
    "#[derive(Default, Clone, FromMap, ToMap)]\n" +
    "pub struct LogMessagesSolanaTs {\n" +
    "    pub block_number: i64,\n" +
    "    pub log_messages: String,\n" +
    "    pub signature: String\n" +
    "}\n" +
    "\n" +
    "impl Into<structmap::GenericMap> for LogMessagesSolanaTs {\n" +
    "    fn into(self) -> structmap::GenericMap {\n" +
    "        LogMessagesSolanaTs::to_genericmap(self.clone())\n" +
    "    }\n" +
    "}\n" +
    "\n" +
    "impl LogMessagesSolanaTs {\n" +
    "    pub fn save(&self) {\n" +
    "        unsafe {\n" +
    "            STORE\n" +
    "                .as_ref()\n" +
    "                .unwrap()\n" +
    '                .save("LogMessagesSolanaTs".to_string(), self.clone().into());\n' +
    "        }\n" +
    "    }\n" +
    "}\n" +
    "",
  PROJECT:
    "schema:\n" +
    "  file: ./schema.graphql\n" +
    "\n" +
    "dataSources:\n" +
    "  - kind: solana\n" +
    "    name: Index\n" +
    "    network: https://data-seed-prebsc-1-s1.binance.org:8545/\n" +
    "",
  UP:
    "CREATE TABLE LogMessagesSolanaTs (\n" +
    "    block_number bigint,\n" +
    "    log_messages varchar,\n" +
    "    signature varchar\n" +
    ")",
  TABLE: "LogMessagesSolanaTs",
  QUERY: ""
};

export const SUB_TEMPLATE_BLOCK = {
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
  TABLE: "BlockTs",
  QUERY: ""
};
export const SUB_TEMPLATE_EVENT = {
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
  TABLE: "EventTs",
  QUERY: ""
};
export const SUB_TEMPLATE_EXTRINSIC = {
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
  TABLE: "ExtrinsicTs",
  QUERY: ""
};
