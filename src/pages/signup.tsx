import SignupForm from "@/components/signup-form";
import BlankLayout from "@/layouts/blank";

export default function SignupPage() {
  return (
    <BlankLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-sm text-center justify-center w-full">
          <SignupForm />
        </div>
      </section>
    </BlankLayout>
  );
}
