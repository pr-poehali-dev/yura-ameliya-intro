import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: number;
  productName: string;
  price: number;
  date: string;
  status: 'pending' | 'completed' | 'shipped';
}

const mockOrders: Order[] = [
  {
    id: 1,
    productName: 'Кулон с лавандой',
    price: 1200,
    date: '2024-11-05',
    status: 'completed',
  },
  {
    id: 2,
    productName: 'Цветочная люстра',
    price: 8500,
    date: '2024-11-03',
    status: 'shipped',
  },
  {
    id: 3,
    productName: 'Подвеска с папоротником',
    price: 1350,
    date: '2024-11-01',
    status: 'pending',
  },
];

const statusConfig = {
  pending: { label: 'В обработке', color: 'bg-yellow-100 text-yellow-800' },
  shipped: { label: 'Отправлен', color: 'bg-blue-100 text-blue-800' },
  completed: { label: 'Получен', color: 'bg-green-100 text-green-800' },
};

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2FCE2] via-white to-[#FFDEE2]">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-border/40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Личный профиль
          </h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-8 p-8 bg-white/60 backdrop-blur border-none animate-fade-in">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Icon name="User" size={40} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Гость</h2>
              <p className="text-muted-foreground">Добро пожаловать в Natura Deco</p>
            </div>
          </div>
        </Card>

        <section className="animate-fade-in">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Icon name="Package" size={24} />
            Мои заказы
          </h3>

          {mockOrders.length === 0 ? (
            <Card className="p-12 text-center bg-white/60 backdrop-blur border-none">
              <Icon name="ShoppingBag" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground text-lg">У вас пока нет заказов</p>
              <Button className="mt-6" onClick={() => navigate('/')}>
                <Icon name="Store" size={18} className="mr-2" />
                Перейти в каталог
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {mockOrders.map((order, index) => (
                <Card
                  key={order.id}
                  className="p-6 bg-white/60 backdrop-blur border-none hover:shadow-lg transition-all animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-xl font-semibold">{order.productName}</h4>
                        <Badge className={statusConfig[order.status].color}>
                          {statusConfig[order.status].label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          {new Date(order.date).toLocaleDateString('ru-RU')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Hash" size={14} />
                          Заказ #{order.id}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        {order.price.toLocaleString('ru-RU')} ₽
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Profile;
