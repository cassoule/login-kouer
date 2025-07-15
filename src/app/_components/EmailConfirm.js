"use client";

import { useState } from "react";
import Form from 'next/form';
import { Eye, EyeOff, Check, X, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function LoginForm() {
    const [companyName, setCompanyName] = useState("");
    const [companyType, setCompanyType] = useState("");
    const [location, setLocation] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [pswVisible, setPswVisible] = useState(false);
    const [pswConfVisible, setPswConfVisible] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const hasMinLength = password.length >= 8;
    const passwordsAreEqual = password === passwordConf;

    const isValidPhone = /^0\d(?:\s?\d{2}){4}$/.test(phoneNumber);

    const criteria = [
        { label: "1 caractère minuscule", valid: hasLowercase },
        { label: "1 caractère majuscule", valid: hasUppercase },
        { label: "1 chiffre", valid: hasNumber },
        { label: "1 caractère spécial", valid: hasSpecial },
        { label: "Minimum 8 caractères", valid: hasMinLength },
    ];

    const inputsClass = "bg-[#F4F4F4] rounded-full px-5 py-2 w-full border border-transparent focus:border-[#4EA04C] focus:ring-1 focus:ring-[#4EA04C] focus:outline-none"

    function formatPhoneNumber(input) {
        const digits = input.replace(/\D/g, "").slice(0, 10);

        return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !companyName ||
            !companyType ||
            !location ||
            !phoneNumber ||
            !email ||
            !password ||
            !passwordConf
        ) {
            setErrorMessage("Veuillez remplir tous les champs.");
            return;
        }

        if (!isValidPhone) {
            setErrorMessage("Le numéro de téléphone n'est pas valide.");
            return;
        }

        if (!hasLowercase || !hasUppercase || !hasNumber || !hasSpecial || !hasMinLength || !passwordsAreEqual) {
            setErrorMessage("Le mot de passe ne respecte pas les critères.");
            return;
        }

        setErrorMessage("");
        setSuccessMessage("Bienvenue dans l'aventure !");
        const form = {
            companyName: companyName,
            companyType: companyType,
            location: location,
            phoneNumber: phoneNumber,
            email: email,
            password: password
        }
        console.log("form submitted", form);
    }

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
                        {'{adresse@mail.com}'}
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
                <p className="text-[16px] font-normal">Tu peux changer ton adresse : <a href='/sign-up-producteur' className="underline text-[var(--primary)]">Modifier mon adresse email</a></p>
            </div>
        </div>
    )
}