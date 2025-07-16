"use client"

import Image from "next/image";
import EmailConfirm from "../_components/EmailConfirm";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Content() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
      <div className="flex items-center justify-center lg:justify-start 2xl:justify-center h-screen p-4 w-full sm:p-4 font-[family-name:var(--font-poppins)]">
        <main className="bg-white flex flex-col items-center w-[600px] row-start-2 rounded-[16px] p-[30px] py-15 sm:px-10 overflow-y-auto max-h-full no-scrollbar">
          <div className="w-full items-center content-center flex flex-col gap-4 pb-10">
            <Image
                src="/logo_large.png"
                alt="Kouer logo"
                width={160.33}
                height={45}
                priority
            />
            <p className="text-[#4EA04C] text-[20px] font-medium">Validez votre email !</p>
          </div>

          <EmailConfirm email={email}/>
        </main>
      </div>
  );
}

export default function Home(){
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
      <Suspense fallback={null}>
        <Content />
      </Suspense>
  );
}
