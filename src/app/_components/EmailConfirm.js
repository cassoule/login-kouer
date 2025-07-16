"use client";

import Image from "next/image";

export default function LoginForm({ email }) {
    return (
        <div className="flex flex-col w-full gap-4 font-[family-name:var(--font-plus-jakarta-sans)]">
            <div className="w-full items-start content-center flex flex-col gap-6">
                <div className="w-full">
                    <p className="text-[16px] font-normal">Merci pour ton inscription !</p>
                </div>

                <div className="w-full">
                    <p className="text-[16px] font-normal">
                        Nous t'avons envoyé un email de confirmation à l'adresse suivante :
                        <br/>
                        {email ?? 'adresse@email.com'}
                        <br/>
                        Clique sur le lien dans cet email pour activer ton compte.
                    </p>
                </div>
            </div>

            <div className="w-full flex flex-col gap-5 mt-5 rounded-[10px] bg-[#F4F4F4] p-5">
                <p className="text-[16px] font-normal flex gap-1">
                    <Image src="/lockIcon.svg" alt="lockIcon" width={24} height={24} />
                    Pas reçu l'email ?
                </p>
                <p className="text-[16px] font-normal">Vérifie ton dossier spam ou courrier indésirable.</p>
                <p className="text-[16px] font-normal">ou <a href='#' className="underline text-[var(--primary)]">renvoyer l'email de confirmation</a></p>
            </div>

            <div className="flex w-full place-items-center gap-3 mt-4">
                <hr className="flex-1/3 text-[#E3E3E3]"/>
                <p className="text-[var(--light-text)] grow-1 shrink-0 font-[family-name:var(--font-plus-jakarta-sans)] font-[500] text-[16px]">Mauvaise adresse ?</p>
                <hr className="flex-1/3 text-[#E3E3E3]"/>
            </div>

            <div className="w-full mt-5">
                <p className="text-[16px] font-normal">Tu peux changer ton adresse : <a href='/sign-up-particulier' className="underline text-[var(--primary)]">Modifier mon adresse email</a></p>
            </div>
        </div>
    )
}