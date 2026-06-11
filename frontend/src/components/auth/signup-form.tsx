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

const signUpSchema = z.object({
  firstname: z.string().min(1, "Tên bắt buộc phải có"),
  lastname: z.string().min(1, "Họ bắt buộc phải có"),
  username: z.string().min(3, "Tên đăng nhập ít nhất phải có 3 ký tự"),
  email: z.email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signUp } = useAuthStore();
  const navigate = useNavigate();
  const onSubmit = async (data: SignUpFormValues) => {
    const { username, password, email, firstname, lastname } = data;
    await signUp(username, password, email, firstname, lastname);
    navigate("/signin");
  };
  // Khởi tạo react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({ resolver: zodResolver(signUpSchema) });

  useEffect(() => {
    if (isSubmitting) toast.warning("Đăng thực hiện đăng ký...");
  }, [isSubmitting]);
  return (
    <div
      className={cn("flex flex-col gap-6 items-center", className)}
      {...props}
    >
      <Card className="w-125">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold">Tạo tài khoản</CardTitle>
          <CardDescription>
            Nhập thông tin bên dưới để tạo tài khoản
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field className="grid grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="name">Họ</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Trần Hồ"
                    required
                    // Đăng kí cho input này với tên là username để kiểm tra với react hook form
                    {...register("lastname")}
                  />
                  {/* In ra lỗi khi người dùng nhập sai từ reat hook form */}
                  {errors.lastname && (
                    <p className="text-destructive">
                      {errors.lastname.message}
                    </p>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="name">Tên</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Đăng Khôi"
                    required
                    {...register("firstname")}
                  />
                  {errors.firstname && (
                    <p className="text-destructive">
                      {errors.firstname.message}
                    </p>
                  )}
                </Field>
              </Field>
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
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@gmail.com"
                  required
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-destructive">{errors.email.message}</p>
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
                  Tạo tài khoản
                </Button>
                <FieldDescription className="text-center">
                  Bạn đã có tài khoản? <a href="/signin">Đăng nhập</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Bằng biệc tiếp tục, bạn đã đồng ý với <a href="#">Đều khoản dịch vụ</a>{" "}
        và <a href="#">Chính sách bảo mật</a> của chúng tôi.
      </FieldDescription>
    </div>
  );
}
