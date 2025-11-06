import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Кулон с лавандой',
    price: 1200,
    image: 'https://cdn.poehali.dev/files/7fa34d6b-2cca-4259-9a55-7ba901416d9e.jpeg',
    category: 'Украшения',
  },
  {
    id: 2,
    name: 'Подвеска с папоротником',
    price: 1350,
    image: 'https://cdn.poehali.dev/files/b2453c3c-05b1-4b60-887a-104ee1f2f6c2.jpeg',
    category: 'Украшения',
  },
  {
    id: 3,
    name: 'Ароматическая свеча',
    price: 2500,
    image: 'https://cdn.poehali.dev/files/11f6225c-88ae-420f-b8d0-52343cefb3ee.jpeg',
    category: 'Декор',
  },
  {
    id: 4,
    name: 'Постер "Морской бриз"',
    price: 1800,
    image: 'https://cdn.poehali.dev/files/d7c445ce-7b11-4858-958a-4deb6b8f69e7.jpeg',
    category: 'Постеры',
  },
  {
    id: 5,
    name: 'Цветочная люстра',
    price: 8500,
    image: 'https://cdn.poehali.dev/files/4c20fda3-c813-4926-9a11-76ddbc92df8f.jpeg',
    category: 'Люстры',
  },
  {
    id: 6,
    name: 'Серьги с ромашкой',
    price: 990,
    image: 'https://cdn.poehali.dev/files/7fa34d6b-2cca-4259-9a55-7ba901416d9e.jpeg',
    category: 'Украшения',
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');

  const categories = ['Все', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleOrderTelegram = (product: Product) => {
    const message = `Здравствуйте! Хочу заказать "${product.name}" за ${product.price}₽`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2FCE2] via-white to-[#FFDEE2]">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Natura Deco
          </h1>
          <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
            <Icon name="User" size={24} />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center animate-fade-in">
          <h2 className="text-5xl font-bold mb-4 text-foreground">
            Декор ручной работы
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Украшения с настоящими цветами, эпоксидные изделия и предметы интерьера
          </p>
        </section>

        <div className="flex gap-2 mb-8 flex-wrap justify-center animate-fade-in">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300 animate-scale-in border-none bg-white/60 backdrop-blur"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-foreground backdrop-blur">
                    {product.category}
                  </Badge>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-3xl font-bold text-primary">
                    {product.price.toLocaleString('ru-RU')} ₽
                  </p>
                </div>

                <Button
                  className="w-full group/btn"
                  size="lg"
                  onClick={() => handleOrderTelegram(product)}
                >
                  <Icon name="Send" size={18} className="mr-2 group-hover/btn:translate-x-1 transition-transform" />
                  Заказать в Telegram
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <footer className="mt-16 py-8 bg-white/40 backdrop-blur border-t border-border/40">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Icon name="Sparkles" size={18} />
            Natura Deco — изделия ручной работы с душой
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;