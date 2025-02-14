

#dev only
DROP DATABASE IF EXISTS chook_raffle;

CREATE DATABASE IF NOT EXISTS chook_raffle;
USE chook_raffle;

# Summary, system and status information
CREATE TABLE IF NOT EXISTS system_table (
    raffle_state VARCHAR(255),
    block_chain VARCHAR(100),
    receive_account VARCHAR(100),
    minimum_donation DECIMAL(38,18),
    total_tokens INTEGER,
    alchemy_url VARCHAR(255),
    alchemy_api_key VARCHAR(100),
    last_donation_block BIGINT,
    start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    end_time DATETIME DEFAULT DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 DAY),
    last_update DATETIME DEFAULT CURRENT_TIMESTAMP
);


delimiter $$
CREATE PROCEDURE touch()
BEGIN
    UPDATE system_table SET last_update=NOW();
END $$
delimiter ;


#donations made
CREATE TABLE IF NOT EXISTS donations(
    account VARCHAR(100),
    hash VARCHAR(100),
    block_num BIGINT,
    block_time VARCHAR(30),
    value DECIMAL(38,18),
    PRIMARY KEY(hash)
);
CREATE INDEX account_index ON donations (account); 

#requests for a raffle entry
CREATE TABLE IF NOT EXISTS raffle_requests(
    account VARCHAR(100),
    block_time VARCHAR(30)
);
CREATE INDEX account_index ON raffle_requests (account); 

#requests that have been approved
CREATE TABLE IF NOT EXISTS approved_entries(
    account VARCHAR(100),
    bin_id INTEGER,
    num_donations INTEGER,
    mum_requests INTEGER,
    value DECIMAL(38,18),
    tokens_granted INTEGER
);
CREATE INDEX account_index ON approved_entries (account); 
CREATE INDEX bin_id_index ON approved_entries (bin_id); 
CREATE INDEX value_index ON approved_entries (value); 

#statistical summary information
CREATE TABLE IF NOT EXISTS stats_summary(
    number_bins INTEGER,
    bin_count INTEGER,
    range_min DECIMAL(38,18),
    range_max DECIMAL(38,18)
);

#statistical information
CREATE TABLE IF NOT EXISTS statistics(
    date DATETIME,
    bin_id INTEGER,
    bin_min DECIMAL(38,18),
    bin_max DECIMAL(38,18),
    bin_value DECIMAL(38,18)
);
CREATE INDEX date_index ON statistics (date); 
CREATE INDEX bin_id_index ON statistics (bin_id); 