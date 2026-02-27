-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    published_at DATE NOT NULL DEFAULT CURRENT_DATE,
    content TEXT NOT NULL,
    cover_image TEXT,
    images TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Certificates table
CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date DATE,
    expiry_date DATE,
    credential_id TEXT,
    credential_url TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Media table
CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    url TEXT NOT NULL,
    filename TEXT NOT NULL,
    mime_type TEXT,
    size INTEGER,
    width INTEGER,
    height INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Profile / Identity table
CREATE TABLE IF NOT EXISTS profile (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    name TEXT,
    role TEXT,
    avatar TEXT,
    email TEXT,
    location TEXT,
    languages TEXT[] DEFAULT '{}',
    github_link TEXT,
    linkedin_link TEXT,
    instagram_link TEXT,
    threads_link TEXT,
    home_headline TEXT,
    home_subline TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert a default record if none exists
INSERT INTO profile (id, name)
SELECT 1, 'Admin'
WHERE NOT EXISTS (SELECT 1 FROM profile WHERE id = 1);
