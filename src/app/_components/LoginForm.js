"use client";

import { useState } from "react";
import Form from 'next/form';
import { Eye, EyeOff, Check, X, ChevronDown } from "lucide-react";

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

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const hasMinLength = password.length >= 8;
    const passwordsAreEqual = password === passwordConf;

    const criteria = [
        { label: "1 caractère minuscule", valid: hasLowercase },
        { label: "1 caractère majuscule", valid: hasUppercase },
        { label: "1 chiffre", valid: hasNumber },
        { label: "1 caractère spécial", valid: hasSpecial },
        { label: "Minimum 8 caractères", valid: hasMinLength },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit", email);
    }

    return (
        <Form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
            <div className="w-full items-start content-center flex flex-col gap-4">
                <div className="w-full">
                    <p className="text-[var(--light-text)] text-[16px] font-thin ml-4">Nom de l'entreprise</p>
                    <input
                        type="text"
                        className="bg-[#F4F4F4] rounded-full px-5 py-2 w-full"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>

                <div className="w-full">
                    <p className="text-[var(--light-text)] text-[16px] font-thin ml-4 mb-1 block">
                        Type d'entreprise
                    </p>
                    <div className="relative">
                        <select
                            value={companyType}
                            onChange={(e) => setCompanyType(e.target.value)}
                            className={`appearance-none bg-[#F4F4F4] rounded-full px-5 py-2 w-full pr-10 ${
                                companyType === "" ? "text-[var(--light-text)]" : ""
                            }`}
                        >
                            <option value="" disabled hidden>Sélectionnez un type d'entreprise</option>
                            <option value="sarl">SARL</option>
                            <option value="sas">SAS</option>
                            <option value="auto-entreprise">Auto-entreprise</option>
                            <option value="association">Association</option>
                        </select>
                        <div className="pointer-events-none absolute right-[5px] top-[5px] w-[30px] h-[30px] flex items-center justify-center rounded-full bg-white">
                            <ChevronDown
                                className="text-[var(--light-text)]"
                                size={18}
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <p className="text-[var(--light-text)] text-[16px] font-thin ml-4 mb-1 block">
                        Localisation
                    </p>
                    <div className="relative">
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className={`appearance-none bg-[#F4F4F4] rounded-full px-5 py-2 w-full pr-10 ${
                                location === "" ? "text-[var(--light-text)]" : ""
                            }`}
                        >
                            <option value="" disabled hidden>Sélectionnez une région</option>
                            <option value="ARA">Auvergne-Rhône-Alpes</option>
                            <option value="BRE">Bretagne</option>
                            <option value="HDF">Hauts-de-France</option>
                            <option value="IDF">Île-de-France</option>
                            <option value="PACA">Provence-Alpes-Côte d’Azur</option>
                        </select>
                        <div className="pointer-events-none absolute right-[5px] top-[5px] w-[30px] h-[30px] flex items-center justify-center rounded-full bg-white">
                            <ChevronDown
                                className="text-[var(--light-text)]"
                                size={18}
                            />
                        </div>
                    </div>

                </div>

                <div className="w-full">
                    <p className="text-[var(--light-text)] text-[16px] font-thin ml-4">Numéro de téléphone</p>
                    <input
                        type="email"
                        className="bg-[#F4F4F4] rounded-full px-5 py-2 w-full"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>

                <div className="w-full">
                    <p className="text-[var(--light-text)] text-[16px] font-thin ml-4">Adresse mail</p>
                    <input
                        type="email"
                        className="bg-[#F4F4F4] rounded-full px-5 py-2 w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="w-full">
                    <p className="text-[var(--light-text)] text-[16px] font-thin ml-4">Mot de passe</p>
                    <div className="relative">
                        <input
                            type={pswVisible ? "text" : "password"}
                            className="bg-[#F4F4F4] rounded-full px-5 py-2 w-full"
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
                            className="bg-[#F4F4F4] rounded-full px-5 py-2 w-full"
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
                    {!passwordsAreEqual && passwordConf.length >= 1 ? <p className="flex items-center gap-2 ml-1 font-thin text-[14px] text-[#F25C5C]"><X size={16} className="shrink-0" />Les mots de passe ne correspondent pas</p> : ''}
                </div>
            </div>

            <div className="w-full items-start content-center flex flex-col gap-4">
                <p className="text-[#505050] font-[400] text-[14px]">
                    En créeant un compte vous acceptez les&nbsp;
                    <a className="underline" href="https://www.kouer.fr/cgv-cgu">Conditions Générales d'Utilisation et les Conditions Générales de Vente</a>
                    &nbsp;&&nbsp;
                    <a className="underline" href="https://www.kouer.fr/politique-de-confidentialite">Politique de confidentialité</a>
                    &nbsp;de Kouer.
                </p>
                <button
                    className="text-white rounded-full flex items-center justify-center bg-[#4EA04C] font-medium text-[16px] h-[44px] w-full cursor-pointer hover:bg-[#00A000]"
                    type="submit"
                >
                    Je crée mon compte
                </button>
                <p className="font-medium text-[16px] text-[var(--light-text)] font-[family-name:var(--font-plus-jakarta-sans)]">J'ai déjà un compte <a className="font-medium text-[16px] text-[var(--primary)] ml-2" href="#">Se connecter</a></p>
            </div>
        </Form>
    )
}