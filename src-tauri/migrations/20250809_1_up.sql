CREATE TABLE IF NOT EXISTS matches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    match_type TEXT NOT NULL,
    player1_id TEXT,
    player2_id TEXT,
    player1_faction TEXT,
    player2_faction TEXT,
    win BOOLEAN NOT NULL,
    map TEXT,
    game TEXT NOT NULL,
    mod TEXT NOT NULL,
    recording_ulid TEXT NOT NULL UNIQUE,
    auto_save_file TEXT,
    recording_start_time DATETIME NOT NULL,
    recording_end_time DATETIME NOT NULL,
    notes TEXT,
    links TEXT,
    army_setups TEXT,
    screenshots TEXT,
    version_major INTEGER NOT NULL,
    version_minor INTEGER NOT NULL,
    version_patch INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_matches_player1_id ON matches(player1_id);
CREATE INDEX IF NOT EXISTS idx_matches_player2_id ON matches(player2_id);
CREATE INDEX IF NOT EXISTS idx_matches_player1_faction ON matches(player1_faction);
CREATE INDEX IF NOT EXISTS idx_matches_player2_faction ON matches(player2_faction);
CREATE INDEX IF NOT EXISTS idx_matches_match_type ON matches(match_type);
CREATE INDEX IF NOT EXISTS idx_matches_win ON matches(win);
CREATE INDEX IF NOT EXISTS idx_matches_game ON matches(game);
CREATE INDEX IF NOT EXISTS idx_matches_mod ON matches(mod);
CREATE INDEX IF NOT EXISTS idx_matches_map ON matches(map);
CREATE INDEX IF NOT EXISTS idx_matches_version_major ON matches(version_major);
CREATE INDEX IF NOT EXISTS idx_matches_version_minor ON matches(version_minor);
CREATE INDEX IF NOT EXISTS idx_matches_version_patch ON matches(version_patch);
