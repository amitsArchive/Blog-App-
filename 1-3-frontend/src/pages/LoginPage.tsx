import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { useAuth } from '../components/AuthContext';
import { Card, CardBody, CardHeader, Input, Button } from '@nextui-org/react';
import { Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await apiService.login({ email, password });
      login(response);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-4">
        <CardHeader className="flex flex-col gap-2 items-center pb-6">
          <h1 className="text-2xl font-bold font-serif">Welcome Back</h1>
          <p className="text-small text-default-500">Sign in to your account to continue</p>
        </CardHeader>
        <CardBody>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              onValueChange={setEmail}
              startContent={<Mail className="text-default-400 pointer-events-none flex-shrink-0" size={16} />}
              variant="bordered"
              isRequired
            />
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onValueChange={setPassword}
              startContent={<Lock className="text-default-400 pointer-events-none flex-shrink-0" size={16} />}
              variant="bordered"
              isRequired
            />

            {error && (
              <div className="p-3 rounded-lg bg-danger-50 text-danger text-sm text-center">
                {error}
              </div>
            )}

            <Button
              type="submit"
              color="primary"
              isLoading={isLoading}
              className="w-full font-medium"
              size="lg"
            >
              Sign In
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;