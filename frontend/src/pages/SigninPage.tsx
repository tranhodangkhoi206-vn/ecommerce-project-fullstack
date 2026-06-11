import { SigninForm } from "@/components/auth/signin-form";
import { Zap } from "lucide-react";

const SigninPage = () => {
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10 bg-gradient-primary">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <a
            href=""
            className="flex items-center gap-2 self-center font-medium"
          >
            <div className="flex size-10 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <Zap className="size-8" />
            </div>
            <div className="text-2xl font-bold">Thunderbolt</div>
          </a>
          <SigninForm />
        </div>
      </div>
    </>
  );
};

export default SigninPage;
