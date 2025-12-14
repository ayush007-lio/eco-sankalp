import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useApp } from '@/contexts/AppContext';
import { 
  Leaf, 
  Menu, 
  X, 
  Home, 
  GraduationCap, 
  Camera, 
  ShoppingBag, 
  MapPin, 
  LayoutDashboard,
  LogOut,
  User,
  ChevronDown,
} from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/training', label: 'Training', icon: GraduationCap },
  { href: '/report', label: 'Report Waste', icon: Camera },
  { href: '/shop', label: 'Shop', icon: ShoppingBag },
  { href: '/facilities', label: 'Facilities', icon: MapPin },
];

const adminLinks = [
  { href: '/admin', label: 'Admin Dashboard', icon: LayoutDashboard },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout, cart } = useApp();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const links = user?.role === 'admin' ? [...adminLinks, ...navLinks.slice(1)] : navLinks;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md group-hover:shadow-glow transition-all duration-300">
            <Leaf className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Eco<span className="text-primary">Sankalp</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        {isAuthenticated && (
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link key={link.href} to={link.href}>
                <Button
                  variant={isActive(link.href) ? 'secondary' : 'ghost'}
                  size="sm"
                  className={isActive(link.href) ? 'bg-primary/10 text-primary' : ''}
                >
                  <link.icon className="h-4 w-4 mr-1" />
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
        )}

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* Green Points Badge */}
              {user?.role === 'citizen' && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                  <Leaf className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">{user.greenPoints} GP</span>
                </div>
              )}

              {/* Cart Button */}
              <Link to="/cart">
                <Button variant="ghost" className="hidden sm:inline-flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="text-sm font-medium">{cart.length}</span>
                </Button>
              </Link>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {user?.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline text-sm font-medium">{user?.name}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                    <p className="text-xs text-primary capitalize mt-1">
                      {user?.role === 'citizen' ? `Level ${user.level} Waste Warrior` : user?.role}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col gap-4 mt-8">
                    {links.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                      >
                        <Button
                          variant={isActive(link.href) ? 'secondary' : 'ghost'}
                          className="w-full justify-start gap-3"
                        >
                          <link.icon className="h-5 w-5" />
                          {link.label}
                        </Button>
                      </Link>
                    ))}
                    <Button variant="destructive" onClick={logout} className="mt-4">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/auth">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button>Get Started</Button>
              </Link>
              <Link to="/admin-auth">
                <Button variant="outline" className="ml-2">Admin</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
