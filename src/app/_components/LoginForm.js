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
        <Form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
            <div className="w-full items-start content-center flex flex-col gap-6">
                <div className="flex w-full place-content-center gap-3">
                    <button className="flex place-items-center gap-3 px-8 py-2 border-2 rounded-full border-[#E3E3E3]">
                        <Image src="/google.png" alt={'Google'} width={30} height={30}/>
                        <p className="text-[var(--light-text)] font-[family-name:var(--font-plus-jakarta-sans)] font-[500] text-[16px]">Continuer avec Google</p>
                    </button>
                </div>

                <div className="flex w-full place-items-center gap-3">
                    <hr className="flex-1/3 text-[#E3E3E3]"/>
                    <p className="text-[var(--light-text)] grow-1 shrink-0 font-[family-name:var(--font-plus-jakarta-sans)] font-[500] text-[16px]">Ou créer un compte Kouer</p>
                    <hr className="flex-1/3 text-[#E3E3E3]"/>
                </div>
                <div className="w-full flex flex-col sm:flex-row place-content-between gap-4">
                    <div className="w-full">
                        <p className="text-[var(--light-text)] text-[16px] font-thin ml-4">Nom</p>
                        <input
                            type="text"
                            className={inputsClass}
                        />
                    </div>

                    <div className="w-full">
                        <p className="text-[var(--light-text)] text-[16px] font-thin ml-4">Prénom</p>
                        <input
                            type="text"
                            className={inputsClass}
                        />
                    </div>
                </div>

                <div className="w-full">
                    <p className="text-[var(--light-text)] text-[16px] font-thin ml-4">Adresse mail</p>
                    <input
                        type="email"
                        className={inputsClass}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="w-full flex flex-col sm:flex-row place-content-between gap-4">
                    <div className="w-full">
                        <p className="text-[var(--light-text)] text-[16px] font-thin ml-4">Numéro de téléphone</p>
                        <input
                            type="tel"
                            className={inputsClass}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                        />
                    </div>

                    <div className="w-full">
                        <p className="text-[var(--light-text)] text-[16px] font-thin ml-4">Date de naissance</p>
                        <input
                            type="date"
                            className={inputsClass}
                            placeholder="JJ/MM/AAAA"
                        />
                    </div>
                </div>


                <div className="w-full">
                    <p className="text-[var(--light-text)] text-[16px] font-thin ml-4">Nom de l'entreprise</p>
                    <input
                        type="text"
                        className={inputsClass}
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>

                <div className="w-full">
                    <p className="text-[var(--light-text)] text-[16px] font-thin ml-4 mb-1 block">
                        Localisation
                    </p>
                    <div className="relative">
                        <select
                            value={location}
                            className={`appearance-none ${!location ? "text-[var(--light-text)]" : ""} ${inputsClass}`}
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <option value="" disabled hidden>Sélectionnez une région</option>
                            <option value="ARA">Auvergne-Rhône-Alpes</option>
                            <option value="BRE">Bretagne</option>
                            <option value="HDF">Hauts-de-France</option>
                            <option value="IDF">Île-de-France</option>
                            <option value="PACA">Provence-Alpes-Côte d’Azur</option>
                        </select>
                        <div className="pointer-events-none absolute right-[5px] top-[5px] w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white">
                            <ChevronDown
                                className="text-[var(--light-text)]"
                                size={18}
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <p className="text-[var(--light-text)] text-[16px] font-thin ml-4">Siret</p>
                    <input
                        type="text"
                        className={inputsClass}
                    />
                </div>

                <div className="w-full">
                    <p className="text-[var(--light-text)] text-[16px] font-thin ml-4">Mot de passe</p>
                    <div className="relative">
                        <input
                            type={pswVisible ? "text" : "password"}
                            className={inputsClass}
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
                            className={inputsClass}
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
                <div className="w-full">
                    {!passwordsAreEqual && passwordConf.length >= 1
                        ? <p className="flex items-center gap-2 ml-1 font-thin text-[14px] text-[#F25C5C]">
                            <X size={16} className="shrink-0" />
                            Les mots de passe ne correspondent pas</p>
                        : ''
                    }
                </div>
            </div>

            <div className="w-full items-start content-center flex flex-col gap-4">
                <p className="text-[#505050] font-[400] text-[14px]">
                    En créeant un compte vous acceptez les&nbsp;
                    <a className="underline" href="https://www.kouer.fr/cgv-cgu">
                        Conditions Générales d'Utilisation et les Conditions Générales de Vente
                    </a>
                    &nbsp;&&nbsp;
                    <a className="underline" href="https://www.kouer.fr/politique-de-confidentialite">
                        Politique de confidentialité
                    </a>
                    &nbsp;de Kouer.
                </p>
                <button
                    className="text-white rounded-full flex items-center justify-center bg-[#4EA04C] font-medium text-[16px] h-[44px] w-full cursor-pointer hover:bg-[#00A000]"
                    type="submit"
                >
                    Je crée mon compte
                </button>
                {errorMessage && (
                    <div className="text-[#F25C5C] font-thin text-[14px]">
                        {errorMessage}
                    </div>
                )}
                {successMessage && (
                    <div className="text-[var(--primary)] font-thin text-[14px]">
                        {successMessage}
                    </div>
                )}
                <p className="font-medium text-[16px] text-[var(--light-text)] font-[family-name:var(--font-plus-jakarta-sans)]">
                    J'ai déjà un compte
                    <a className="font-medium text-[16px] text-[var(--primary)] ml-2" href="#">Se connecter</a>
                </p>
            </div>
        </Form>
    )
}