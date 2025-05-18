create table if not exists table_location(
    numLoc varchar(10) primary key,
    nomLoc varchar(50),
    designVoiture varchar(50),
    nombreJour int,
    tauxJournalier DECIMAL(10,2),
    dateCreation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)