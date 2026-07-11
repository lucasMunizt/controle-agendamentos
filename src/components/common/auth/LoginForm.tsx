import { ShieldCheck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { useState } from "react";

const LoginForm = () => {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    nome: "",
    company_name: "",
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const loginSchema = z.object({
    email: z.string().trim().email("email inválido").max(255),
    password: z
      .string()
      .trim()
      .min(6, "Senha deve ter ao menos 6 caracteres")
      .max(255),
  });

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse(login);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setLoginErrors({
        email: errors.email?.[0],
        password: errors.password?.[0],
      });
      return;
    }
    setLoading(true);
    localStorage.setItem("autenticado", "true");
    navigate("/", { replace: true });
  };

  const submitSignup = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="min-h-screen bg-background grid place-items-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center gap-2 justify-center">
            <div className="grid h-10 w-10 place-items-center bg-blue-600 rounded-lg  text-primary-foreground">
              <ShieldCheck className="h-5 w-5" color="white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Gestão para sua empresa</h1>
              <p className="text-xs text-muted-foreground">
                Agendamentos e garantias em um só lugar
              </p>
            </div>
          </div>
          <Card>
            <Tabs defaultValue="login">
              <CardHeader className="pb-2">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="login" className="w-full">
                    Entrar
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="w-full">
                    Criar conta
                  </TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent>
                <TabsContent value="login" className="mt-2">
                  <CardTitle className="text-base mb-1">
                    Acessar sua conta
                  </CardTitle>
                  <CardDescription className="mb-4">
                    Entre com seu e-mail e senha.
                  </CardDescription>
                  <form className="grid gap-3">
                    {" "}
                    <div className="grid gap-2">
                      <Label htmlFor="login-email">E-mail</Label>
                      <Input
                        id="login-email"
                        type="email"
                        autoComplete="email"
                        aria-invalid={!!loginErrors.email}
                        value={login.email}
                        className={
                          loginErrors.email
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }
                        onChange={(e) => {
                          setLogin({
                            ...login,
                            email: e.target.value,
                          });

                          setLoginErrors({
                            ...loginErrors,
                            email: undefined,
                          });
                        }}
                      />{" "}
                      {loginErrors.email && (
                        <p className="text-sm text-destructive">
                          {loginErrors.email}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="login-pass">Senha</Label>
                      <Input
                        id="login-pass"
                        type="password"
                        autoComplete="current-password"
                        aria-invalid={!!loginErrors.password}
                        value={login.password}
                        className={
                          loginErrors.password
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }
                        onChange={(e) => {
                          setLogin({
                            ...login,
                            password: e.target.value,
                          });

                          setLoginErrors({
                            ...loginErrors,
                            password: undefined,
                          });
                        }}
                      />
                      {loginErrors.password && (
                        <p className="text-sm text-destructive">
                          {loginErrors.password}
                        </p>
                      )}
                    </div>
                    {/* botão submit para fazer login */}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600"
                      size={"lg"}
                      onClick={submitLogin}
                    >
                      {loading ? "Entrando..." : "Entrar"}
                    </Button>
                  </form>
                  {/* signup */}
                </TabsContent>
                <TabsContent value="signup" className="mt-2">
                  <CardTitle className="text-base mb-1">
                    Criar conta da empresa
                  </CardTitle>
                  <CardDescription className="mb-4">
                    Cadastre sua empresa. Você será o dono da conta.
                  </CardDescription>
                  <form onSubmit={submitSignup} className="grid gap-3">
                    <div className="grid gap-2">
                      <Label htmlFor="s-nome">Seu nome</Label>
                      <Input
                        id="s-nome"
                        value={signup.nome}
                        onChange={(e) =>
                          setSignup({ ...signup, nome: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="s-company">Nome da empresa</Label>
                      <Input
                        id="s-company"
                        value={signup.company_name}
                        onChange={(e) =>
                          setSignup({ ...signup, company_name: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="s-email">E-mail</Label>
                      <Input
                        id="s-email"
                        type="email"
                        autoComplete="email"
                        value={signup.email}
                        onChange={(e) =>
                          setSignup({ ...signup, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="s-pass">Senha</Label>
                      <Input
                        id="s-pass"
                        type="password"
                        autoComplete="new-password"
                        value={signup.password}
                        onChange={(e) =>
                          setSignup({ ...signup, password: e.target.value })
                        }
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600"
                      size={"lg"}
                    >
                      {loading ? "Criando..." : "Criar conta"}
                    </Button>
                  </form>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
