import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEffect } from "react";
import useAuthStore from "@/stores/useAuthStore";
import { useNavigate } from "react-router";

const signInSchema = z.object({
  username: z.string().min(3, "Tên đăng nhập ít nhất phải có 3 ký tự"),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signIn } = useAuthStore();
  const navigate = useNavigate();
  const onSubmit = async (data: SignInFormValues) => {
    const { username, password } = data;
    await signIn(username, password);
    navigate("/");
  };
  // Khởi tạo react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({ resolver: zodResolver(signInSchema) });

  useEffect(() => {
    if (isSubmitting) toast.warning("Đăng thực hiện đăng nhập...");
  }, [isSubmitting]);
  return (
    <div
      className={cn("flex flex-col gap-6 items-center", className)}
      {...props}
    >
      <Card className="w-125">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold">Đăng nhập</CardTitle>
          <CardDescription>
            Nhập thông tin bên dưới để đăng nhập
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="text"
                  type="text"
                  placeholder="tranhodangkhoi"
                  required
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-destructive">{errors.username.message}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-destructive">{errors.password.message}</p>
                )}
              </Field>
              <Field>
                <Button
                  className="h-9 text-sm! cursor-pointer"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Đăng nhập
                </Button>
                <FieldDescription className="text-center">
                  Bạn đã chưa có tài khoản? <a href="/signup">Đăng ký</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Bằng việc tiếp tục, bạn đã đồng ý với <a href="#">Đều khoản dịch vụ</a>{" "}
        và <a href="#">Chính sách bảo mật</a> của chúng tôi.
      </FieldDescription>
    </div>
  );
}
