import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'citizen' | 'worker' | 'admin';
export type ReportStatus = 'pending' | 'verified' | 'cleaned';
export type TrainingStatus = 'not_started' | 'in_progress' | 'completed';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  greenPoints: number;
  level: number;
  trainingCompleted: boolean;
  avatar?: string;
  joinedDate: string;
}

export interface WasteReport {
  id: string;
  userId: string;
  userName: string;
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  description: string;
  severity: 'high' | 'medium' | 'low';
  status: ReportStatus;
  createdAt: string;
  verifiedAt?: string;
  cleanedAt?: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'article' | 'quiz';
  isCompleted: boolean;
  isLocked: boolean;
  content?: string;
  quiz?: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  greenPointsPrice: number;
  image: string;
  category: 'dustbin' | 'compost' | 'bags' | 'accessories';
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  useGreenPoints: boolean;
}

export interface Facility {
  id: string;
  name: string;
  type: 'biomethanization' | 'recycling' | 'scrap';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  phone: string;
  hours: string;
}

export interface UserQuery {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'open' | 'closed';
}

export type OrderStatus = 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  status: OrderStatus;
  trackingNumber?: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  reports: WasteReport[];
  addReport: (report: Omit<WasteReport, 'id' | 'createdAt' | 'status'>) => void;
  updateReportStatus: (reportId: string, status: ReportStatus) => void;
  trainingModules: TrainingModule[];
  completeModule: (moduleId: string) => void;
  trainingProgress: number;
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, useGreenPoints: boolean) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  facilities: Facility[];
  liveStats: {
    wasteReported: number;
    wasteTreated: number;
    activeUsers: number;
    treesPlanted: number;
  };
  queries: UserQuery[];
  addQuery: (q: Omit<UserQuery, 'id' | 'createdAt' | 'status'>) => void;
  closeQuery: (queryId: string) => void;
  orders: Order[];
  createOrder: (userId: string, items: CartItem[]) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const mockTrainingModules: TrainingModule[] = [
  {
    id: '1',
    title: 'Source Segregation 101',
    description: 'Learn the fundamentals of waste segregation at source - the first step to responsible waste management.',
    duration: '15 min',
    type: 'video',
    isCompleted: false,
    isLocked: false,
    content: 'Understanding waste segregation is crucial for effective waste management...',
    quiz: [
      {
        id: 'q1',
        question: 'Which bin should wet/organic waste go into?',
        options: ['Green Bin', 'Blue Bin', 'Red Bin', 'Yellow Bin'],
        correctAnswer: 0,
      },
      {
        id: 'q2',
        question: 'What percentage of household waste is organic?',
        options: ['20%', '40%', '60%', '80%'],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: '2',
    title: 'Composting at Home',
    description: 'Transform your kitchen waste into nutrient-rich compost for your garden.',
    duration: '20 min',
    type: 'article',
    isCompleted: false,
    isLocked: true,
    content: 'Home composting is an excellent way to reduce waste...',
    quiz: [
      {
        id: 'q3',
        question: 'What is the ideal carbon to nitrogen ratio for composting?',
        options: ['10:1', '30:1', '50:1', '70:1'],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: '3',
    title: 'Hazardous Waste Safety',
    description: 'Identify and safely dispose of hazardous household waste materials.',
    duration: '25 min',
    type: 'video',
    isCompleted: false,
    isLocked: true,
    content: 'Hazardous waste requires special handling...',
    quiz: [
      {
        id: 'q4',
        question: 'Which of these is considered hazardous waste?',
        options: ['Fruit peels', 'Newspapers', 'Used batteries', 'Cardboard'],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: '4',
    title: 'E-Waste Management',
    description: 'Proper disposal and recycling of electronic waste.',
    duration: '18 min',
    type: 'article',
    isCompleted: false,
    isLocked: true,
  },
  {
    id: '5',
    title: 'Plastic Reduction Strategies',
    description: 'Practical tips to reduce single-use plastic in daily life.',
    duration: '12 min',
    type: 'video',
    isCompleted: false,
    isLocked: true,
  },
];

const mockProducts: Product[] = [
  {
    id: 'p1',
    name: '3-Color Dustbin Set',
    description: 'Premium segregation bins with color-coded lids for wet, dry, and hazardous waste.',
    price: 1499,
    greenPointsPrice: 500,
    image: '/placeholder.svg',
    category: 'dustbin',
    inStock: true,
  },
  {
    id: 'p2',
    name: 'Home Compost Kit',
    description: 'Complete composting solution with aerator, activator, and guide book.',
    price: 2999,
    greenPointsPrice: 1000,
    image: '/placeholder.svg',
    category: 'compost',
    inStock: true,
  },
  {
    id: 'p3',
    name: 'Bio-degradable Bags (100 pcs)',
    description: 'Eco-friendly bags that decompose naturally within 180 days.',
    price: 399,
    greenPointsPrice: 150,
    image: '/placeholder.svg',
    category: 'bags',
    inStock: true,
  },
  {
    id: 'p4',
    name: 'Kitchen Counter Bin',
    description: 'Stylish countertop bin with charcoal filter for odor control.',
    price: 899,
    greenPointsPrice: 300,
    image: '/placeholder.svg',
    category: 'dustbin',
    inStock: true,
  },
  {
    id: 'p5',
    name: 'Vermicompost Starter Kit',
    description: 'Everything you need to start vermicomposting at home.',
    price: 1999,
    greenPointsPrice: 750,
    image: '/placeholder.svg',
    category: 'compost',
    inStock: false,
  },
  {
    id: 'p6',
    name: 'Recycling Guide Poster',
    description: 'Colorful poster showing what goes where in waste segregation.',
    price: 199,
    greenPointsPrice: 50,
    image: '/placeholder.svg',
    category: 'accessories',
    inStock: true,
  },
];

const mockFacilities: Facility[] = [
  {
    id: 'f1',
    name: 'GreenTech Biomethanization Plant',
    type: 'biomethanization',
    location: { lat: 28.6139, lng: 77.209, address: 'Sector 15, Noida, UP' },
    phone: '+91 9876543210',
    hours: '8:00 AM - 6:00 PM',
  },
  {
    id: 'f2',
    name: 'EcoRecycle Center',
    type: 'recycling',
    location: { lat: 28.6292, lng: 77.2181, address: 'MG Road, Gurgaon, HR' },
    phone: '+91 9876543211',
    hours: '9:00 AM - 5:00 PM',
  },
  {
    id: 'f3',
    name: 'Urban Scrap Shop',
    type: 'scrap',
    location: { lat: 28.5355, lng: 77.391, address: 'Sector 62, Noida, UP' },
    phone: '+91 9876543212',
    hours: '10:00 AM - 8:00 PM',
  },
];

const mockReports: WasteReport[] = [
  {
    id: 'r1',
    userId: 'u1',
    userName: 'Rahul Sharma',
    imageUrl: '/placeholder.svg',
    location: { lat: 28.6139, lng: 77.209, address: 'Block A, Sector 15, Noida' },
    description: 'Large pile of mixed waste near park entrance. Overflowing for 3 days.',
    severity: 'high',
    status: 'pending',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'r2',
    userId: 'u2',
    userName: 'Priya Patel',
    imageUrl: '/placeholder.svg',
    location: { lat: 28.6292, lng: 77.2181, address: 'MG Road, Gurgaon' },
    description: 'Construction debris dumped on footpath.',
    severity: 'medium',
    status: 'verified',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    verifiedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'r3',
    userId: 'u3',
    userName: 'Amit Kumar',
    imageUrl: '/placeholder.svg',
    location: { lat: 28.5355, lng: 77.391, address: 'Sector 62, Noida' },
    description: 'Plastic waste near drain causing blockage.',
    severity: 'high',
    status: 'cleaned',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    verifiedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    cleanedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const mockQueries: UserQuery[] = [
  {
    id: 'q1',
    name: 'Suresh Kumar',
    email: 'suresh@example.com',
    subject: 'Installation of community bins',
    message: 'Can the municipality install an additional bin near Block B?',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'open',
  },
  {
    id: 'q2',
    name: 'Rita Singh',
    email: 'rita@example.com',
    subject: 'Compost workshop',
    message: 'Is there any upcoming composting workshop for residents?',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'open',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem('es_user');
      return raw ? (JSON.parse(raw) as User) : null;
    } catch (e) {
      return null;
    }
  });

  const [reports, setReports] = useState<WasteReport[]>(mockReports);
  const [trainingModules, setTrainingModules] = useState<TrainingModule[]>(mockTrainingModules);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem('es_cart');
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch (e) {
      return [];
    }
  });

  const [queries, setQueries] = useState<UserQuery[]>(() => {
    try {
      const raw = localStorage.getItem('es_queries');
      return raw ? (JSON.parse(raw) as UserQuery[]) : mockQueries;
    } catch (e) {
      return mockQueries;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const raw = localStorage.getItem('es_orders');
      return raw ? (JSON.parse(raw) as Order[]) : [];
    } catch (e) {
      return [];
    }
  });

  const isAuthenticated = user !== null;

  const trainingProgress = Math.round(
    (trainingModules.filter((m) => m.isCompleted).length / trainingModules.length) * 100
  );

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Mock login
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: 'u1',
      name: email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      email,
      role,
      greenPoints: role === 'citizen' ? 350 : 0,
      level: role === 'citizen' ? 2 : 1,
      trainingCompleted: false,
      joinedDate: new Date().toISOString(),
    };
    
    setUser(mockUser);
    return true;
  };

  const signup = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: `u${Date.now()}`,
      name,
      email,
      role,
      greenPoints: 0,
      level: 1,
      trainingCompleted: false,
      joinedDate: new Date().toISOString(),
    };
    
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    setCart([]);
  };

  useEffect(() => {
    try {
      if (user) localStorage.setItem('es_user', JSON.stringify(user));
      else localStorage.removeItem('es_user');
    } catch (e) {
      // ignore
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('es_cart', JSON.stringify(cart));
    } catch (e) {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('es_queries', JSON.stringify(queries));
    } catch (e) {
      // ignore
    }
  }, [queries]);

  useEffect(() => {
    try {
      localStorage.setItem('es_orders', JSON.stringify(orders));
    } catch (e) {
      // ignore
    }
  }, [orders]);

  const addReport = (reportData: Omit<WasteReport, 'id' | 'createdAt' | 'status'>) => {
    const newReport: WasteReport = {
      ...reportData,
      id: `r${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setReports((prev) => [newReport, ...prev]);
    
    // Award green points
    if (user) {
      setUser({ ...user, greenPoints: user.greenPoints + 25 });
    }
  };

  const addQuery = (q: Omit<UserQuery, 'id' | 'createdAt' | 'status'>) => {
    const newQ: UserQuery = {
      ...q,
      id: `q${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'open',
    };
    setQueries((prev) => [newQ, ...prev]);
  };

  const closeQuery = (queryId: string) => {
    setQueries((prev) => prev.map((q) => (q.id === queryId ? { ...q, status: 'closed' } : q)));
  };

  const createOrder = (userId: string, items: CartItem[]) => {
    const total = items.reduce((s, it) => s + it.product.price * it.quantity, 0);
    const order: Order = {
      id: `o${Date.now()}`,
      userId,
      items,
      total,
      createdAt: new Date().toISOString(),
      status: 'processing',
      trackingNumber: `TRK${Math.floor(100000 + Math.random() * 900000)}`,
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
  };

  const updateReportStatus = (reportId: string, status: ReportStatus) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          return {
            ...r,
            status,
            ...(status === 'verified' && { verifiedAt: new Date().toISOString() }),
            ...(status === 'cleaned' && { cleanedAt: new Date().toISOString() }),
          };
        }
        return r;
      })
    );
  };

  const completeModule = (moduleId: string) => {
    setTrainingModules((prev) => {
      const moduleIndex = prev.findIndex((m) => m.id === moduleId);
      if (moduleIndex === -1) return prev;

      const updated = [...prev];
      updated[moduleIndex] = { ...updated[moduleIndex], isCompleted: true };

      // Unlock next module
      if (moduleIndex + 1 < updated.length) {
        updated[moduleIndex + 1] = { ...updated[moduleIndex + 1], isLocked: false };
      }

      return updated;
    });

    // Award green points
    if (user) {
      setUser({ ...user, greenPoints: user.greenPoints + 50 });
    }
  };

  const addToCart = (product: Product, useGreenPoints: boolean) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1, useGreenPoints }
            : item
        );
      }
      return [...prev, { product, quantity: 1, useGreenPoints }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const liveStats = {
    wasteReported: 12847,
    wasteTreated: 11234,
    activeUsers: 45672,
    treesPlanted: 8934,
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        login,
        signup,
        logout,
        reports,
        addReport,
        updateReportStatus,
        trainingModules,
        completeModule,
        trainingProgress,
        products: mockProducts,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        facilities: mockFacilities,
        queries,
        addQuery,
        closeQuery,
        orders,
        createOrder,
        updateOrderStatus,
        liveStats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
