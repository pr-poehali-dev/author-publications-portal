import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type PublicationType = 'Статьи' | 'Учебные пособия' | 'Монографии' | 'Публицистика' | 'Литература' | 'Интервью';

interface Publication {
  id: number;
  title: string;
  type: PublicationType;
  year: number;
  description: string;
  journal?: string;
  pages?: string;
}

const publications: Publication[] = [
  {
    id: 1,
    title: 'Современные подходы к анализу литературного текста',
    type: 'Статьи',
    year: 2024,
    description: 'Исследование методов интерпретации художественных произведений в контексте постмодернистской критики',
    journal: 'Филологический вестник',
    pages: '45-62'
  },
  {
    id: 2,
    title: 'Основы литературоведения',
    type: 'Учебные пособия',
    year: 2023,
    description: 'Комплексное учебное пособие для студентов филологических специальностей, охватывающее теорию литературы',
    pages: '320'
  },
  {
    id: 3,
    title: 'Эволюция романа в русской литературе XX века',
    type: 'Монографии',
    year: 2022,
    description: 'Монография посвящена изучению трансформации жанра романа в русской литературе прошлого столетия',
    pages: '456'
  },
  {
    id: 4,
    title: 'Культура чтения в цифровую эпоху',
    type: 'Публицистика',
    year: 2024,
    description: 'Размышления о том, как изменилось восприятие литературы в эпоху социальных медиа и электронных книг',
    journal: 'Литературная газета'
  },
  {
    id: 5,
    title: 'Тени забытых предков: рассказы',
    type: 'Литература',
    year: 2021,
    description: 'Сборник коротких рассказов о памяти, времени и человеческих взаимоотношениях',
    pages: '180'
  },
  {
    id: 6,
    title: 'Беседа о литературе и жизни',
    type: 'Интервью',
    year: 2024,
    description: 'Интервью для журнала "Вопросы литературы" о творческом пути, влияниях и современной литературной критике',
    journal: 'Вопросы литературы'
  },
  {
    id: 7,
    title: 'Символизм в поэзии Серебряного века',
    type: 'Статьи',
    year: 2023,
    description: 'Анализ символистской образности в творчестве Блока, Белого и Брюсова',
    journal: 'Русская литература',
    pages: '78-95'
  },
  {
    id: 8,
    title: 'Практикум по литературному анализу',
    type: 'Учебные пособия',
    year: 2022,
    description: 'Практические задания и упражнения для развития навыков литературного анализа',
    pages: '240'
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<PublicationType | 'Все'>('Все');

  const types: Array<PublicationType | 'Все'> = [
    'Все',
    'Статьи',
    'Учебные пособия',
    'Монографии',
    'Публицистика',
    'Литература',
    'Интервью'
  ];

  const filteredPublications = publications.filter(pub => {
    const matchesSearch = 
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'Все' || pub.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <header className="mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-4 tracking-tight">
            Публикации
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Научные статьи, монографии, учебные материалы и литературные произведения
          </p>
        </header>

        <div className="mb-12 space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="relative">
            <Icon 
              name="Search" 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" 
              size={20} 
            />
            <Input
              type="text"
              placeholder="Поиск по названию или описанию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-base border-border focus:border-primary transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedType === type
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {filteredPublications.length === 0 ? (
            <div className="text-center py-16 animate-fade-in">
              <Icon name="FileSearch" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground">
                По вашему запросу ничего не найдено
              </p>
            </div>
          ) : (
            filteredPublications.map((pub, index) => (
              <article
                key={pub.id}
                className="group bg-card border border-border rounded-lg p-8 hover:border-primary transition-all duration-300 hover:shadow-lg animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h2 className="text-3xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {pub.title}
                    </h2>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Badge variant="secondary" className="font-normal">
                        {pub.type}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Icon name="Calendar" size={14} />
                        {pub.year}
                      </span>
                      {pub.journal && (
                        <span className="flex items-center gap-1">
                          <Icon name="BookOpen" size={14} />
                          {pub.journal}
                        </span>
                      )}
                      {pub.pages && (
                        <span className="flex items-center gap-1">
                          <Icon name="FileText" size={14} />
                          {pub.pages} {pub.type === 'Статьи' ? '' : 'стр.'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-base text-foreground/80 leading-relaxed">
                  {pub.description}
                </p>
              </article>
            ))
          )}
        </div>

        {filteredPublications.length > 0 && (
          <div className="mt-12 text-center text-sm text-muted-foreground animate-fade-in">
            Найдено публикаций: {filteredPublications.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
