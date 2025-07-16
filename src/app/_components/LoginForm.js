"use client";

import { useState } from "react";
import Form from 'next/form';
import { Eye, EyeOff, Check, X, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pswVisible, setPswVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const inputsClass = "bg-[#F4F4F4] rounded-full px-5 py-2 w-full border focus:ring-1 focus:outline-none"

    const getBorderColor = (field) => {
        if (submitted) {
            return errors[field]
                ? 'border-[#F25C5C] focus:ring-[#F25C5C]'
                : 'border-[var(--primary)] focus:ring-[var(--primary)]';
        }
        return 'border-transparent focus:border-[#4EA04C] focus:ring-[#4EA04C]';
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true);
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "L'adresse mail est requise.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "L'adresse mail n'est pas valide.";
        }

        if (!password.trim()) {
            newErrors.password = "Le mot de passe est requis.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Form submitted successfully");
        }
    }

    return (
        <Form onSubmit={handleSubmit} className="flex flex-col w-full gap-4 max-w-[340px] mt-6">
            <div className="w-full items-start content-center flex flex-col gap-6 ">
                <div className="w-full">
                    <p className="text-[var(--light-text)] text-[16px] font-thin ml-4">Adresse mail</p>
                    <input
                        type="email"
                        className={`${inputsClass} ${getBorderColor('email')}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="w-full">
                    <p className="text-[var(--light-text)] text-[16px] font-thin ml-4">Mot de passe</p>
                    <div className="relative">
                        <input
                            type={pswVisible ? "text" : "password"}
                            className={`${inputsClass} ${getBorderColor('password')}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setPswVisible(!pswVisible)}
                            className="absolute right-3 h-full top-0 flex items-center text-[var(--light-text)] cursor-pointer"
                        >
                            {pswVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    <p className="mt-3">
                        <a href="#" className="text-[var(--light-text)] text-[14px] font-thin underline">Mot de passe oublié</a>
                    </p>
                </div>
            </div>

            <div className="w-full items-start content-center flex flex-col gap-4">
                <button
                    className="text-white rounded-full flex items-center justify-center bg-[#4EA04C] font-medium text-[16px] h-[44px] w-full cursor-pointer "
                    type="submit"
                >
                    Se connecter
                </button>
                <a
                    href='/sign-up-particulier'
                    className="text-[var(--primary)] rounded-full flex items-center justify-center border-2 border-[var(--primary)] font-medium text-[16px] h-[44px] w-full cursor-pointer "
                >
                    Créer un compte
                </a>
            </div>

            <div className="flex w-full place-items-center gap-3 mt-4">
                <hr className="flex-1/3 text-[#E3E3E3]"/>
                <p className="text-[var(--light-text)] grow-1 shrink-0 font-[family-name:var(--font-plus-jakarta-sans)] font-[500] text-[16px]">ou se connecter avec</p>
                <hr className="flex-1/3 text-[#E3E3E3]"/>
            </div>

            <div className="flex w-full place-content-center gap-3">
                <a href="#" className="flex place-items-center gap-3 px-2 py-2 border-2 rounded-full border-[#E3E3E3]">
                    <Image src="/google.png" alt={'Google'} width={30} height={30}/>
                </a>
            </div>
        </Form>
    )
}