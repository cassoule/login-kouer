"use client";

import { useState } from "react";
import Form from 'next/form';
import { Eye, EyeOff, Check, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function LoginForm() {
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState(null);

    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [pswVisible, setPswVisible] = useState(false);
    const [pswConfVisible, setPswConfVisible] = useState(false);

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

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

    const inputsClass = "bg-[#F4F4F4] rounded-full px-5 py-2 w-full border focus:ring-1 focus:outline-none"

    const getBorderColor = (field) => {
        if (submitted) {
            return errors[field]
                ? 'border-[#F25C5C] focus:ring-[#F25C5C]'
                : 'border-[var(--primary)] focus:ring-[var(--primary)]';
        }
        return 'border-transparent focus:border-[#4EA04C] focus:ring-[#4EA04C]';
    };

    function formatPhoneNumber(input) {
        const digits = input.replace(/\D/g, "").slice(0, 10);

        return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true);
        const newErrors = {};

        if (!lastName.trim()) {
            newErrors.lastName = 'Le nom est requis.';
        }

        if (!firstName.trim()) {
            newErrors.firstName = 'Le prénom est requis.';
        }

        if (!email.trim()) {
            newErrors.email = "L'adresse mail est requise.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "L'adresse mail n'est pas valide.";
        }

        if (!phoneNumber.trim()) {
            newErrors.phoneNumber = 'Le numéro de téléphone est requis.';
        } else if (phoneNumber.length < 14) {
            newErrors.phoneNumber = 'Le numéro de téléphone n\'est pas valide.';
        }

        if (!birthDate) {
            newErrors.birthDate = 'La date de naissance est requise.';
        }

        if (!password.trim()) {
            newErrors.password = "Le mot de passe est requis.";
        } else if (!(hasLowercase && hasUppercase && hasNumber && hasSpecial && hasMinLength)) {
            newErrors.password = "Le mot de passe ne respecte pas les critères.";
        }

        if (!passwordConf.trim()) {
            newErrors.passwordConf = "Le mot de passe est requis.";
        } else if (!passwordsAreEqual) {
            newErrors.passwordConf = "Les mots de passe ne correspondent pas.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const encodedEmail = encodeURIComponent(email);
            window.location.href = `/validation-email?email=${encodedEmail}`;
        }
    }

    return (
        <Form onSubmit={handleSubmit} className="flex flex-col w-full gap-[20px]">
            <div className="w-full items-start content-center flex flex-col gap-6">
                <div className="flex w-full place-content-center gap-3">
                    <a href="#" className="flex place-items-center gap-3 px-8 py-2 border-2 rounded-full border-[#E3E3E3]">
                        <Image src="/google.png" alt={'Google'} width={30} height={30}/>
                        <p className="text-[var(--light-text)] font-[family-name:var(--font-plus-jakarta-sans)] font-[500] text-[16px]">Continuer avec Google</p>
                    </a>
                </div>

                <div className="flex w-full place-items-center gap-3 my-[10px]">
                    <hr className="flex-1/3 text-[#E3E3E3]"/>
                    <p className="text-[var(--light-text)] grow-1 shrink-0 font-[family-name:var(--font-plus-jakarta-sans)] font-[500] text-[16px]">Ou créer un compte Kouer</p>
                    <hr className="flex-1/3 text-[#E3E3E3]"/>
                </div>

                <div className="w-full flex flex-col sm:flex-row place-content-between gap-4">
                    <div className="w-full">
                        <p className="text-[var(--light-text)] text-[16px] font-thin ml-4">Nom</p>
                        <input
                            type="text"
                            className={`${inputsClass} ${getBorderColor('lastName')}`}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className="w-full">
                        <p className="text-[var(--light-text)] text-[16px] font-thin ml-4">Prénom</p>
                        <input
                            type="text"
                            className={`${inputsClass} ${getBorderColor('firstName')}`}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="w-full">
                    <p className="text-[var(--light-text)] text-[16px] font-thin ml-4">Adresse mail</p>
                    <input
                        type="email"
                        className={`${inputsClass} ${getBorderColor('email')}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="w-full flex flex-col sm:flex-row place-content-between gap-4">
                    <div className="w-full">
                        <p className="text-[var(--light-text)] text-[16px] font-thin ml-4">Numéro de téléphone</p>
                        <input
                            type="tel"
                            className={`${inputsClass} ${getBorderColor('phoneNumber')}`}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                        />
                    </div>

                    <div className="w-full">
                        <p className="text-[var(--light-text)] text-[16px] font-thin ml-4">Date de naissance</p>
                        {/*<input*/}
                        {/*    type="date"*/}
                        {/*    className={`${inputsClass} ${getBorderColor('birthDate')} placeholder:text-[var(--light-text)]`}*/}

                        {/*    value={birthDate}*/}
                        {/*    onChange={(e) => setBirthDate(e.target.value)}*/}
                        {/*/>*/}
                        <DatePicker
                            selected={birthDate}
                            onChange={(date) => setBirthDate(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="JJ/MM/AAAA"
                            className={`${inputsClass} ${getBorderColor('birthDate')} placeholder:text-gray-400 uppercase`}
                        />
                    </div>
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
                </div>

                <div className="w-full">
                    <ul className="ml-1 space-y-2 text-[14px] font-thin">
                        {criteria.map((rule, idx) => (
                            <li
                                key={idx}
                                className={`flex items-center gap-2 ${
                                    rule.valid ? "text-[var(--primary)]" : "text-[#F25C5C]"
                                }`}
                            >
                                {rule.valid ? (
                                    <Check size={16} className="shrink-0" />
                                ) : (
                                    <X size={16} className="shrink-0" />
                                )}
                                {rule.label}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-full">
                    <p className="text-[var(--light-text)] text-[16px] font-thin ml-4">Confirmer le mot de passe</p>
                    <div className="relative">
                        <input
                            type={pswConfVisible ? "text" : "password"}
                            className={`${inputsClass} ${getBorderColor('passwordConf')}`}
                            value={passwordConf}
                            onChange={(e) => setPasswordConf(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setPswConfVisible(!pswConfVisible)}
                            className="absolute right-3 h-full top-0 flex items-center text-[var(--light-text)] cursor-pointer"
                        >
                            {pswConfVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full items-start content-center flex flex-col gap-4">
                <p className="text-[#505050] font-[400] text-[14px]">
                    En créant un compte vous acceptez les&nbsp;
                    <a className="underline" href="https://www.kouer.fr/cgv-cgu">
                        CGU, les CGV
                    </a>
                    &nbsp;et la&nbsp;
                    <a className="underline" href="https://www.kouer.fr/politique-de-confidentialite">
                        Politique de confidentialité
                    </a>
                    &nbsp;de Kouer.
                </p>
                <button
                    className="text-white rounded-full flex items-center justify-center bg-[#4EA04C] font-medium text-[16px] h-[44px] w-full cursor-pointer"
                    type="submit"
                >
                    Je crée mon compte
                </button>
                <p className="font-medium text-[16px] text-[var(--light-text)] font-[family-name:var(--font-plus-jakarta-sans)]">
                    Vous avez déjà un compte ?
                    <a className="font-medium text-[16px] text-[var(--primary)] ml-2" href="/">Se connecter</a>
                </p>
            </div>

            <div className="flex w-full place-items-center gap-3 mt-4">
                <hr className="flex-1/3 text-[#E3E3E3]"/>
                <p className="text-[var(--light-text)] grow-1 shrink-0 font-[family-name:var(--font-plus-jakarta-sans)] font-[500] text-[16px]">Vous êtes producteur ou artisan ?</p>
                <hr className="flex-1/3 text-[#E3E3E3]"/>
            </div>

            <div className="flex w-full place-content-center gap-3">
                <a
                    href='#'
                    className="text-[var(--primary)] rounded-full flex items-center justify-center border-2 border-[var(--primary)] font-medium text-[16px] h-[44px] w-full cursor-pointer "
                >
                    Créer un compte professionnel gratuit
                </a>
            </div>
        </Form>
    )
}