CREATE TABLE IF NOT EXISTS matches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    match_type TEXT NOT NULL,
    player_faction TEXT NOT NULL,
    opponent_faction TEXT NOT NULL,
    win BOOLEAN NOT NULL,
    map TEXT NOT NULL,
    game TEXT NOT NULL,
    mod TEXT NOT NULL,
    recording_ulid TEXT NOT NULL UNIQUE,
    auto_save_file TEXT NOT NULL,
    recording_start_time DATETIME NOT NULL,
    recording_end_time DATETIME NOT NULL,
    notes TEXT,
    links TEXT,
    army_setups TEXT,
    screenshots TEXT
);
