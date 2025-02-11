

#dev only
DROP DATABASE IF EXISTS chook_raffle;

CREATE DATABASE IF NOT EXISTS chook_raffle;
USE chook_raffle;

# Summary, system and status information
CREATE TABLE IF NOT EXISTS system_table (
    state VARCHAR(255),
    block_chain VARCHAR(100),
    receive_account VARCHAR(100),
    minimum_donation DECIMAL(38,18),
    total_tokens INTEGER,
    alchemy_url VARCHAR(255),
    alchemy_api_key VARCHAR(100),
    donation_timestamp DATETIME
);

delimiter $$
CREATE PROCEDURE donation_timestamp()
BEGIN
UPDATE system_table SET donation_timestamp NOW();
SELECT donation_timestamp FROM system_table;
END $$
delimiter ;

INSERT INTO system_table (id,state,block_chain,receive_account,minimum_donation,total_tokens, alchemy_url, alchemy_api_key,donation_timestamp)
VALUES (1,"dummy data","hardhat","xxxxxx",0.0,0,”https://xxx” ,”xxx”,0);


#donations made
CREATE TABLE IF NOT EXISTS donations(
    account VARCHAR(100),
    block_time DATETIME,
    value DECIMAL(38,18)
);

#requests for a raffle entry
CREATE TABLE IF NOT EXISTS raffle_requests(
    account VARCHAR(100),
    block_time DATETIME
);


#requests that have been approved
CREATE TABLE IF NOT EXISTS approved_entries(
    account VARCHAR(100),
    bin_id INTEGER,
    num_donations INTEGER,
    mum_requests INTEGER,
    value DECIMAL(38,18),
    tokens_granted INTEGER
);

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