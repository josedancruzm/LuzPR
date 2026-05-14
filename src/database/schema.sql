CREATE TABLE light_post (
    light_id      BIGSERIAL PRIMARY KEY,
    city          TEXT,
    latitude      DOUBLE PRECISION,
    longitude     DOUBLE PRECISION,
    operating     BOOLEAN,
    CONSTRAINT    unique_coords_lp UNIQUE (latitude, longitude)
);

CREATE TABLE traffic_light (
    traffic_id   BIGSERIAL PRIMARY KEY,
    city          TEXT,
    latitude      DOUBLE PRECISION,
    longitude     DOUBLE PRECISION,
    operating     BOOLEAN,
    CONSTRAINT    unique_coords_tl UNIQUE (latitude, longitude)
);

CREATE TABLE luma_user(
    luma_number     CHAR(10) PRIMARY KEY,
    first_name      TEXT,
    last_name       TEXT,
    user_ssn        CHAR(4)
);

CREATE TABLE ticket_status(
    status_id       BIGSERIAL PRIMARY KEY,
    status_name     VARCHAR(20) CHECK (status_name IN ('submitted', 'attending', 'resolved'))
);

CREATE TABLE ticket (
    ticket_id       BIGSERIAL PRIMARY KEY,
    luma_number     CHAR(10) REFERENCES luma_user(luma_number),
    light_post_id   BIGINT REFERENCES light_post(light_id),
    status_id       INT REFERENCES ticket_status(status_id),
    created_at      TIMESTAMP DEFAULT NOW(),
    resolved_at     TIMESTAMP
);

INSERT INTO ticket_status (status_name) VALUES ('submitted');
INSERT INTO ticket_status (status_name) VALUES ('attending');
INSERT INTO ticket_status (status_name) VALUES ('resolved');