-- Таблица публикаций
CREATE TABLE IF NOT EXISTS publications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('Статьи', 'Учебные пособия', 'Монографии', 'Публицистика', 'Литература', 'Интервью')),
    year INTEGER NOT NULL CHECK (year >= 1900 AND year <= 2100),
    description TEXT NOT NULL,
    journal VARCHAR(255),
    pages VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_publications_type ON publications(type);
CREATE INDEX idx_publications_year ON publications(year);

-- Таблица сообщений обратной связи
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX idx_contact_messages_is_read ON contact_messages(is_read);

-- Вставляем существующие публикации
INSERT INTO publications (title, type, year, description, journal, pages) VALUES
('Современные подходы к анализу литературного текста', 'Статьи', 2024, 'Исследование методов интерпретации художественных произведений в контексте постмодернистской критики', 'Филологический вестник', '45-62'),
('Основы литературоведения', 'Учебные пособия', 2023, 'Комплексное учебное пособие для студентов филологических специальностей, охватывающее теорию литературы', NULL, '320'),
('Эволюция романа в русской литературе XX века', 'Монографии', 2022, 'Монография посвящена изучению трансформации жанра романа в русской литературе прошлого столетия', NULL, '456'),
('Культура чтения в цифровую эпоху', 'Публицистика', 2024, 'Размышления о том, как изменилось восприятие литературы в эпоху социальных медиа и электронных книг', 'Литературная газета', NULL),
('Тени забытых предков: рассказы', 'Литература', 2021, 'Сборник коротких рассказов о памяти, времени и человеческих взаимоотношениях', NULL, '180'),
('Беседа о литературе и жизни', 'Интервью', 2024, 'Интервью для журнала "Вопросы литературы" о творческом пути, влияниях и современной литературной критике', 'Вопросы литературы', NULL),
('Символизм в поэзии Серебряного века', 'Статьи', 2023, 'Анализ символистской образности в творчестве Блока, Белого и Брюсова', 'Русская литература', '78-95'),
('Практикум по литературному анализу', 'Учебные пособия', 2022, 'Практические задания и упражнения для развития навыков литературного анализа', NULL, '240');