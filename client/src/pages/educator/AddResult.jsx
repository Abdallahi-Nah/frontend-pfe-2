"use client";

import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AppContext } from "../../context/AppContext";

export default function AddResult() {
  const [formData, setFormData] = useState({
    specialite: "",
    module: "",
    matiere: "",
    matricule: "",
    type: "",
    note: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleSelectChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const FormField = ({ children, label }) => (
    <div className="relative">
      <label className="block text-sm text-gray-600 mb-2 font-medium">
        {label}
      </label>
      <div className="relative">{children}</div>
    </div>
  );

  const CustomSelect = ({ value, onChange, placeholder, options }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-12 px-3 py-2 bg-white border border-gray-300 rounded-md text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
        >
          <span className={value ? "text-gray-900" : "text-gray-500"}>
            {value
              ? options.find((opt) => opt.value === value)?.label
              : placeholder}
          </span>
          <svg
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const specialiteOptions = [
    { value: "informatique", label: "Informatique" },
    { value: "mathematiques", label: "Mathématiques" },
    { value: "physique", label: "Physique" },
    { value: "chimie", label: "Chimie" },
  ];

  const moduleOptions = [
    { value: "module1", label: "Module 1" },
    { value: "module2", label: "Module 2" },
    { value: "module3", label: "Module 3" },
    { value: "module4", label: "Module 4" },
  ];

  const typeOptions = [
    { value: "examen", label: "Examen" },
    { value: "controle", label: "Contrôle" },
    { value: "tp", label: "Travaux Pratiques" },
    { value: "projet", label: "Projet" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Row 1 */}
          <FormField label="spécialité">
            <CustomSelect
              value={formData.specialite}
              onChange={(value) => handleSelectChange("specialite", value)}
              placeholder="Sélectionner une spécialité"
              options={specialiteOptions}
            />
          </FormField>

          <FormField label="module">
            <CustomSelect
              value={formData.module}
              onChange={(value) => handleSelectChange("module", value)}
              placeholder="Sélectionner un module"
              options={moduleOptions}
            />
          </FormField>

          {/* Row 2 */}
          <FormField label="matière">
            <input
              type="text"
              value={formData.matiere}
              onChange={(e) => handleInputChange("matiere", e.target.value)}
              placeholder="Entrer la matière"
              className="w-full h-12 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </FormField>

          <FormField label="matricule">
            <input
              type="text"
              value={formData.matricule}
              onChange={(e) => handleInputChange("matricule", e.target.value)}
              placeholder="Entrer le matricule"
              className="w-full h-12 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </FormField>

          {/* Row 3 */}
          <FormField label="type">
            <CustomSelect
              value={formData.type}
              onChange={(value) => handleSelectChange("type", value)}
              placeholder="Sélectionner un type"
              options={typeOptions}
            />
          </FormField>

          <FormField label="note">
            <input
              type="number"
              value={formData.note}
              onChange={(e) => handleInputChange("note", e.target.value)}
              placeholder="Entrer une note"
              className="w-full h-12 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
              max="20"
              step="0.1"
            />
          </FormField>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium min-w-[200px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}
