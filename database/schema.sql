-- ============================================
-- Hackathon TPM - Full Database Schema
-- ============================================
-- Run this script to create all tables for the Hackathon website.
-- Use the same database name as in your .env (DB_NAME).
-- ============================================

-- USER_GROUPS (participant teams)
CREATE TABLE IF NOT EXISTS user_groups (
    id_group INT PRIMARY KEY AUTO_INCREMENT,
    group_name VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_binusian BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- USER_LEADERS (team leader data + file paths)
CREATE TABLE IF NOT EXISTS user_leaders (
    id_leader INT PRIMARY KEY AUTO_INCREMENT,
    id_group INT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    whatsapp_number VARCHAR(20) UNIQUE NOT NULL,
    line_id VARCHAR(100) UNIQUE NOT NULL,
    github_gitlab_id VARCHAR(100),
    birth_place VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    cv_path VARCHAR(500),
    flazz_card_path VARCHAR(500),
    id_card_path VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_group) REFERENCES user_groups(id_group) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ADMINS (admin login for admin panel)
CREATE TABLE IF NOT EXISTS admins (
    id_admin INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
