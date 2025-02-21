import LoginForm from "@/components/loginform";
import DefaultLayout from "@/layouts/default";

export default function LoginPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-sm text-center justify-center w-full">
          <LoginForm></LoginForm>
        </div>
      </section>
    </DefaultLayout>
  );
}
