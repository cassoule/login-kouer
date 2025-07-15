import Image from "next/image";
import LoginForm from "./_components/LoginForm";

export default function Home(){
  return (
    <div className="flex items-start justify-center lg:justify-start 2xl:justify-center h-screen p-4 w-full sm:p-4 font-[family-name:var(--font-poppins)]">
      <main className="bg-white flex flex-col items-center w-[600px] row-start-2 rounded-[16px] p-8 py-16 sm:px-8 overflow-y-auto max-h-full max-h-full no-scrollbar">
        <div className="w-full items-center content-center flex flex-col gap-4 pb-8">
          <Image
              src="/logo_large.png"
              alt="Kouer logo"
              width={160.33}
              height={45}
              priority
          />
          <p className="text-[#4EA04C] text-[20px] font-medium">Commencez l'aventure !</p>
        </div>

        <LoginForm />
      </main>
    </div>
  );
}
