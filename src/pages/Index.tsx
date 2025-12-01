import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
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
  const [sortBy, setSortBy] = useState<'year-desc' | 'year-asc' | 'title'>('year-desc');
  const [activeSection, setActiveSection] = useState<'publications' | 'about'>('publications');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Сообщение отправлено!',
      description: 'Спасибо за ваше обращение. Ответим в ближайшее время.',
    });
    
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const types: Array<PublicationType | 'Все'> = [
    'Все',
    'Статьи',
    'Учебные пособия',
    'Монографии',
    'Публицистика',
    'Литература',
    'Интервью'
  ];

  const filteredPublications = publications
    .filter(pub => {
      const matchesSearch = 
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'Все' || pub.type === selectedType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'year-desc') {
        return b.year - a.year;
      } else if (sortBy === 'year-asc') {
        return a.year - b.year;
      } else {
        return a.title.localeCompare(b.title);
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveSection('publications')}
              className={`text-base font-medium transition-colors ${
                activeSection === 'publications'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Публикации
            </button>
            <button
              onClick={() => setActiveSection('about')}
              className={`text-base font-medium transition-colors ${
                activeSection === 'about'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Об авторе
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {activeSection === 'about' ? (
          <div className="animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 flex flex-col md:flex-row gap-8 items-start">
                <img
                  src="https://cdn.poehali.dev/projects/85b19980-5942-4b2d-ac1d-a6c9f697ec82/files/94cc352e-11e2-4c12-b1d1-53a04e5e72ae.jpg"
                  alt="Портрет автора"
                  className="w-64 h-64 object-cover rounded-lg shadow-lg"
                />
                <div className="flex-1">
                  <h1 className="text-5xl font-bold text-foreground mb-4 tracking-tight">
                    Об авторе
                  </h1>
                  <p className="text-xl text-muted-foreground mb-6">
                    Доктор филологических наук, профессор
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="mailto:author@example.com"
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                      <Icon name="Mail" size={18} />
                      <span>Написать письмо</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none space-y-6 text-foreground/90">
                <p className="text-lg leading-relaxed">
                  Доктор филологических наук, профессор кафедры русской литературы. 
                  Специализируется на изучении русской литературы XIX-XX веков, 
                  литературной критике и теории литературы.
                </p>

                <h2 className="text-3xl font-semibold text-foreground mt-12 mb-6">
                  Образование
                </h2>
                <ul className="space-y-3 text-base">
                  <li className="flex items-start gap-3">
                    <Icon name="GraduationCap" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <span>Московский государственный университет им. М.В. Ломоносова — доктор филологических наук (2015)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="GraduationCap" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <span>Санкт-Петербургский государственный университет — кандидат филологических наук (2008)</span>
                  </li>
                </ul>

                <h2 className="text-3xl font-semibold text-foreground mt-12 mb-6">
                  Научные интересы
                </h2>
                <ul className="space-y-2 text-base list-disc list-inside">
                  <li>Русская литература Серебряного века</li>
                  <li>Постмодернизм в русской прозе</li>
                  <li>Литературная критика и теория интерпретации</li>
                  <li>Компаративистика и межкультурные литературные связи</li>
                </ul>

                <h2 className="text-3xl font-semibold text-foreground mt-12 mb-6">
                  Достижения
                </h2>
                <ul className="space-y-3 text-base">
                  <li className="flex items-start gap-3">
                    <Icon name="Award" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <span>Лауреат премии "За выдающийся вклад в литературоведение" (2022)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Award" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <span>Член редколлегии журнала "Вопросы литературы"</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Award" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <span>Более 100 опубликованных научных работ</span>
                  </li>
                </ul>

                <h2 className="text-3xl font-semibold text-foreground mt-12 mb-6">
                  Связаться со мной
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base">Имя</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ваше имя"
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-base">Сообщение</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ваше сообщение..."
                      required
                      rows={6}
                      className="resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 px-8 text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Icon name="Send" className="mr-2 h-4 w-4" />
                        Отправить
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <>
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

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
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

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Icon name="ArrowUpDown" size={18} className="text-muted-foreground" />
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-full sm:w-[200px] h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="year-desc">Сначала новые</SelectItem>
                  <SelectItem value="year-asc">Сначала старые</SelectItem>
                  <SelectItem value="title">По алфавиту</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Index;