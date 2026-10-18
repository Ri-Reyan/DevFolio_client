"use client";

import {
  AlertCircle,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Languages,
  Plus,
  Save,
  Trash2,
  Wrench,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { api, getGitHubLinkUrl } from "@/lib/api";
import type {
  EducationItem,
  FullProfile,
  Gender,
  LanguageItem,
  LanguageLevel,
  TechnologyItem,
} from "@/types/profile";

const GENDER_OPTIONS: { label: string; value: Gender }[] = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Other", value: "OTHER" },
  { label: "Prefer not to say", value: "PREFER_NOT_TO_SAY" },
];

const LANGUAGE_LEVELS: { label: string; value: LanguageLevel }[] = [
  { label: "Basic", value: "BASIC" },
  { label: "Conversational", value: "CONVERSATIONAL" },
  { label: "Fluent", value: "FLUENT" },
  { label: "Native", value: "NATIVE" },
];

export default function ProfilePage() {
  const { refreshUser } = useAuth();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [technologies, setTechnologies] = useState<TechnologyItem[]>([]);
  const [profile, setProfile] = useState<FullProfile | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<Gender | "">("");
  const [country, setCountry] = useState("");
  const [expertiseTechId, setExpertiseTechId] = useState("");

  // Skills State
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  // Education State
  const [educations, setEducations] = useState<EducationItem[]>([]);
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [editingEduIndex, setEditingEduIndex] = useState<number | null>(null);
  const [eduForm, setEduForm] = useState<EducationItem>({
    institution: "",
    degree: "",
    field: "",
    startYear: new Date().getFullYear() - 4,
    endYear: new Date().getFullYear(),
    grade: "",
  });

  // Languages State
  const [languages, setLanguages] = useState<LanguageItem[]>([]);
  const [newLangName, setNewLangName] = useState("");
  const [newLangLevel, setNewLangLevel] =
    useState<LanguageLevel>("CONVERSATIONAL");

  // Fetch initial profile and technologies
  const loadProfileData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [profileRes, techRes] = await Promise.all([
        api.get<FullProfile>("/profile"),
        api.get<TechnologyItem[]>("/technologies"),
      ]);

      if (profileRes.success && profileRes.data) {
        const p = profileRes.data;
        setProfile(p);
        setFullName(p.fullName || "");
        setAge(p.age != null ? String(p.age) : "");
        setGender(p.gender || "");
        setCountry(p.country || "");
        setSkills(p.skills || []);
        setExpertiseTechId(p.expertiseTechnologyId || "");
        setEducations(p.educations || []);
        setLanguages(p.languages || []);
      }

      if (techRes.success && techRes.data) {
        setTechnologies(techRes.data);
      }
    } catch {
      toast.error("Failed to load profile data. Please refresh the page.");
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadProfileData();
  }, [loadProfileData]);

  // Skills Handlers
  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;

    if (skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      toast.info(`"${trimmed}" is already added.`);
      setSkillInput("");
      return;
    }

    if (skills.length >= 30) {
      toast.error("Maximum 30 skills allowed.");
      return;
    }

    setSkills([...skills, trimmed]);
    setSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  // Education Handlers
  const handleOpenAddEdu = () => {
    setEditingEduIndex(null);
    setEduForm({
      institution: "",
      degree: "",
      field: "",
      startYear: new Date().getFullYear() - 4,
      endYear: new Date().getFullYear(),
      grade: "",
    });
    setIsEduModalOpen(true);
  };

  const handleOpenEditEdu = (index: number) => {
    setEditingEduIndex(index);
    setEduForm({ ...educations[index] });
    setIsEduModalOpen(true);
  };

  const handleSaveEdu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduForm.institution.trim() || !eduForm.degree.trim()) {
      toast.error("Institution and Degree are required.");
      return;
    }

    if (eduForm.endYear && eduForm.endYear < eduForm.startYear) {
      toast.error("End year cannot be earlier than start year.");
      return;
    }

    if (editingEduIndex !== null) {
      const updated = [...educations];
      updated[editingEduIndex] = { ...eduForm };
      setEducations(updated);
    } else {
      if (educations.length >= 5) {
        toast.error("Maximum 5 education records allowed.");
        return;
      }
      setEducations([...educations, { ...eduForm }]);
    }

    setIsEduModalOpen(false);
  };

  const handleDeleteEdu = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  // Languages Handlers
  const handleAddLanguage = () => {
    const trimmed = newLangName.trim();
    if (!trimmed) {
      toast.error("Language name is required.");
      return;
    }

    if (languages.some((l) => l.name.toLowerCase() === trimmed.toLowerCase())) {
      toast.info(`"${trimmed}" is already added.`);
      return;
    }

    if (languages.length >= 8) {
      toast.error("Maximum 8 languages allowed.");
      return;
    }

    setLanguages([...languages, { name: trimmed, level: newLangLevel }]);
    setNewLangName("");
    setNewLangLevel("CONVERSATIONAL");
  };

  const handleDeleteLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  // Save Full Profile
  const handleSaveProfile = async () => {
    if (isSaving) return;

    if (fullName.trim().length > 0 && fullName.trim().length < 2) {
      toast.error("Full name must be at least 2 characters long.");
      return;
    }

    const ageNum = age.trim() ? Number.parseInt(age.trim(), 10) : null;
    if (
      ageNum !== null &&
      (Number.isNaN(ageNum) || ageNum < 13 || ageNum > 100)
    ) {
      toast.error("Age must be between 13 and 100.");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        fullName: fullName.trim() || undefined,
        age: ageNum,
        gender: gender || null,
        country: country.trim() || null,
        skills,
        expertiseTechnologyId: expertiseTechId || null,
        educations,
        languages,
      };

      const res = await api.put<FullProfile>("/profile", payload);
      if (res.success && res.data) {
        setProfile(res.data);
        toast.success("Developer profile updated successfully!");
        // Refresh AuthContext to sync completion metrics globally
        await refreshUser();
      }
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "message" in err
          ? String((err as { message: unknown }).message)
          : "Failed to update profile. Please try again.";
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full flex items-center justify-center min-h-[60vh]">
        <div className="border border-neutral-200 bg-white p-8 max-w-sm w-full text-center space-y-4 shadow-xs">
          <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
            <span>{"// PROFILE_INITIALIZATION"}</span>
          </div>
          <p className="text-xs text-neutral-600 font-mono">
            Loading developer profile records…
          </p>
          <div className="w-full bg-neutral-100 h-1 overflow-hidden">
            <div className="bg-black h-full w-1/2 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const completion = profile?.profileCompletion;
  const isGithubLinked = !!profile?.githubAccount?.login;

  return (
    <div className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div className="space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
            <span>{"// PROFILE_MANAGEMENT"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
            Developer Profile
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
            Manage your professional engineering identity, competencies,
            education records, and primary technology stack.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveProfile}
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-black shadow-xs shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? "Saving Changes…" : "Save Profile"}</span>
        </button>
      </div>

      {/* Profile Completion Metrics Card */}
      {completion && (
        <section
          aria-label="Profile Completion Score"
          className="bg-white border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                <span>{"// READINESS_SCORE"}</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-black font-mono">
                  {completion.percentage}%
                </span>
                <span
                  className={`text-xs font-mono uppercase tracking-wider px-2 py-0.5 border ${
                    completion.isComplete
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-neutral-100 text-neutral-600 border-neutral-200"
                  }`}
                >
                  {completion.isComplete
                    ? "PROFILE COMPLETE (100%)"
                    : "INCOMPLETE"}
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-500 font-mono max-w-sm">
              All six mandatory sections must be satisfied to unlock AI resume
              compilation and technical interview arenas.
            </p>
          </div>

          {/* Visual Progress Bar */}
          <div className="w-full bg-neutral-100 h-2 rounded-none overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                completion.isComplete ? "bg-emerald-500" : "bg-[#EA6F53]"
              }`}
              style={{ width: `${completion.percentage}%` }}
            />
          </div>

          {/* Six Mandatory Requirements Checklist */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
            {(
              [
                { key: "BASICS", label: "Basics (20%)" },
                { key: "EXPERTISE", label: "Expertise (20%)" },
                { key: "SKILLS", label: "Skills (20%)" },
                { key: "EDUCATION", label: "Education (20%)" },
                { key: "LANGUAGE", label: "Language (10%)" },
                { key: "GITHUB", label: "GitHub (10%)" },
              ] as const
            ).map((item) => {
              const isSatisfied = completion.completedSections.includes(
                item.key,
              );
              return (
                <div
                  key={item.key}
                  className={`p-3 border text-xs flex flex-col justify-between space-y-2 ${
                    isSatisfied
                      ? "bg-emerald-50/40 border-emerald-200"
                      : "bg-neutral-50/60 border-neutral-200"
                  }`}
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    {item.key}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isSatisfied ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    )}
                    <span
                      className={`text-[11px] font-medium truncate ${
                        isSatisfied ? "text-emerald-900" : "text-neutral-600"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Main Form Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Basics & Primary Stack */}
        <div className="lg:col-span-1 space-y-8">
          {/* Section 1: Basic Information */}
          <section className="bg-white border border-neutral-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
              <Briefcase className="w-4 h-4 text-[#EA6F53]" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-black font-semibold">
                Basic Information
              </h2>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label
                  htmlFor="field-fullName"
                  className="block text-neutral-500 font-mono text-[10px] uppercase mb-1"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="field-fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-3 py-2 border border-neutral-300 focus:border-black focus:outline-none transition-colors text-black font-sans"
                />
              </div>

              <div>
                <label
                  htmlFor="field-age"
                  className="block text-neutral-500 font-mono text-[10px] uppercase mb-1"
                >
                  Age (Optional)
                </label>
                <input
                  id="field-age"
                  type="number"
                  min={13}
                  max={100}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 25"
                  className="w-full px-3 py-2 border border-neutral-300 focus:border-black focus:outline-none transition-colors text-black font-sans"
                />
              </div>

              <div>
                <label
                  htmlFor="field-gender"
                  className="block text-neutral-500 font-mono text-[10px] uppercase mb-1"
                >
                  Gender (Optional)
                </label>
                <select
                  id="field-gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value as Gender | "")}
                  className="w-full px-3 py-2 border border-neutral-300 bg-white focus:border-black focus:outline-none transition-colors text-black font-sans"
                >
                  <option value="">Select gender...</option>
                  {GENDER_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="field-country"
                  className="block text-neutral-500 font-mono text-[10px] uppercase mb-1"
                >
                  Country (Optional)
                </label>
                <input
                  id="field-country"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. Canada"
                  className="w-full px-3 py-2 border border-neutral-300 focus:border-black focus:outline-none transition-colors text-black font-sans"
                />
              </div>
            </div>
          </section>

          {/* Section 5: Primary Expertise Technology */}
          <section className="bg-white border border-neutral-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
              <Wrench className="w-4 h-4 text-[#EA6F53]" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-black font-semibold">
                Primary Expertise
              </h2>
            </div>

            <div className="space-y-2 text-xs">
              <label
                htmlFor="field-expertiseTech"
                className="block text-neutral-500 font-mono text-[10px] uppercase"
              >
                Core Technology <span className="text-red-500">*</span>
              </label>
              <select
                id="field-expertiseTech"
                value={expertiseTechId}
                onChange={(e) => setExpertiseTechId(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 bg-white focus:border-black focus:outline-none transition-colors text-black font-sans"
              >
                <option value="">Select your core stack...</option>
                {technologies.map((tech) => (
                  <option key={tech.id} value={tech.id}>
                    {tech.name}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                Determines the technical domain for question generation in the
                AI Interview Arena.
              </p>
            </div>
          </section>

          {/* Section 6: GitHub Integration Status */}
          <section className="bg-white border border-neutral-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
              <FaGithub className="w-4 h-4 text-black" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-black font-semibold">
                GitHub Linking
              </h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-neutral-500 font-mono uppercase">
                  STATUS
                </span>
                {isGithubLinked ? (
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    CONNECTED
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-neutral-500 bg-neutral-100 px-2 py-0.5 border border-neutral-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    NOT LINKED
                  </span>
                )}
              </div>

              {isGithubLinked ? (
                <div className="p-3 bg-neutral-50 border border-neutral-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-black">
                    <FaGithub className="w-4 h-4" />
                    <span className="font-semibold">
                      @{profile?.githubAccount?.login}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600">
                    Verified
                  </span>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                    Connect your GitHub account to fulfill the 10% linking
                    requirement and enable automated AST analysis.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      window.location.assign(getGitHubLinkUrl());
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                    <span>Connect GitHub</span>
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Skills, Education, Languages */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section 2: Technical Skills */}
          <section className="bg-white border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#EA6F53]" />
                <h2 className="text-xs font-mono uppercase tracking-widest text-black font-semibold">
                  Technical Skills
                </h2>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">
                {skills.length} / 30 skills (min. 3 for completion)
              </span>
            </div>

            {/* Skill Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                placeholder="e.g. React, PostgreSQL, Docker..."
                className="flex-1 px-3 py-2 border border-neutral-300 focus:border-black focus:outline-none transition-colors text-xs font-sans"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                Add Skill
              </button>
            </div>

            {/* Skills Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 border border-neutral-200 text-xs font-mono text-black group hover:border-neutral-400 transition-colors"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-neutral-400 hover:text-red-600 transition-colors"
                    aria-label={`Remove skill ${skill}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}

              {skills.length === 0 && (
                <p className="text-xs text-neutral-400 font-mono italic">
                  No skills added yet. Add at least 3 skills to fulfill the
                  SKILLS milestone.
                </p>
              )}
            </div>
          </section>

          {/* Section 3: Education Records */}
          <section className="bg-white border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#EA6F53]" />
                <h2 className="text-xs font-mono uppercase tracking-widest text-black font-semibold">
                  Education
                </h2>
              </div>
              <button
                type="button"
                onClick={handleOpenAddEdu}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-black hover:text-[#EA6F53] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Record</span>
              </button>
            </div>

            <div className="space-y-3">
              {educations.map((edu, idx) => (
                <div
                  key={`${edu.institution}-${idx}`}
                  className="p-4 border border-neutral-200 bg-neutral-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-black transition-colors"
                >
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-black">
                      {edu.institution}
                    </div>
                    <div className="text-xs text-neutral-600">
                      {edu.degree}
                      {edu.field ? ` in ${edu.field}` : ""}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400">
                      {edu.startYear} — {edu.endYear || "Present"}
                      {edu.grade ? ` · Grade: ${edu.grade}` : ""}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenEditEdu(idx)}
                      className="px-2.5 py-1 text-xs font-mono border border-neutral-200 bg-white hover:border-black text-black transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteEdu(idx)}
                      className="p-1 text-neutral-400 hover:text-red-600 transition-colors"
                      aria-label="Delete education entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {educations.length === 0 && (
                <p className="text-xs text-neutral-400 font-mono italic p-4 text-center border border-dashed border-neutral-200">
                  No education entries recorded. Add at least 1 verified entry
                  to achieve the EDUCATION milestone.
                </p>
              )}
            </div>
          </section>

          {/* Section 4: Languages */}
          <section className="bg-white border border-neutral-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
              <Languages className="w-4 h-4 text-[#EA6F53]" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-black font-semibold">
                Language Proficiencies
              </h2>
            </div>

            {/* Language Inline Form */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                value={newLangName}
                onChange={(e) => setNewLangName(e.target.value)}
                placeholder="Language (e.g. English)"
                className="px-3 py-2 border border-neutral-300 focus:border-black focus:outline-none transition-colors text-xs font-sans"
              />
              <select
                value={newLangLevel}
                onChange={(e) =>
                  setNewLangLevel(e.target.value as LanguageLevel)
                }
                className="px-3 py-2 border border-neutral-300 bg-white focus:border-black focus:outline-none transition-colors text-xs font-sans"
              >
                {LANGUAGE_LEVELS.map((lvl) => (
                  <option key={lvl.value} value={lvl.value}>
                    {lvl.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddLanguage}
                className="px-4 py-2 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                Add Language
              </button>
            </div>

            {/* Languages List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {languages.map((lang, idx) => (
                <div
                  key={`${lang.name}-${idx}`}
                  className="p-3 border border-neutral-200 bg-neutral-50 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold text-black">
                      {lang.name}
                    </span>
                    <span className="block text-[10px] font-mono text-neutral-400">
                      {lang.level}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteLanguage(idx)}
                    className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                    aria-label={`Remove language ${lang.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {languages.length === 0 && (
                <p className="text-xs text-neutral-400 font-mono italic sm:col-span-2">
                  No languages added. Add at least 1 language entry to satisfy
                  the LANGUAGE requirement.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Education Modal Dialog */}
      {isEduModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edu-dialog-title"
            className="w-full max-w-lg bg-white border border-neutral-200 shadow-2xl p-6 sm:p-8 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3
                id="edu-dialog-title"
                className="text-sm font-bold text-black font-mono uppercase"
              >
                {editingEduIndex !== null
                  ? "Edit Education Record"
                  : "Add Education Record"}
              </h3>
              <button
                type="button"
                onClick={() => setIsEduModalOpen(false)}
                className="text-neutral-400 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdu} className="space-y-4 text-xs">
              <div>
                <label
                  htmlFor="edu-institution"
                  className="block font-mono text-[10px] uppercase text-neutral-500 mb-1"
                >
                  Institution Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="edu-institution"
                  type="text"
                  required
                  value={eduForm.institution}
                  onChange={(e) =>
                    setEduForm({ ...eduForm, institution: e.target.value })
                  }
                  placeholder="e.g. University of California, Berkeley"
                  className="w-full px-3 py-2 border border-neutral-300 focus:border-black focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="edu-degree"
                  className="block font-mono text-[10px] uppercase text-neutral-500 mb-1"
                >
                  Degree <span className="text-red-500">*</span>
                </label>
                <input
                  id="edu-degree"
                  type="text"
                  required
                  value={eduForm.degree}
                  onChange={(e) =>
                    setEduForm({ ...eduForm, degree: e.target.value })
                  }
                  placeholder="e.g. Bachelor of Science"
                  className="w-full px-3 py-2 border border-neutral-300 focus:border-black focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="edu-field"
                  className="block font-mono text-[10px] uppercase text-neutral-500 mb-1"
                >
                  Field of Study (Optional)
                </label>
                <input
                  id="edu-field"
                  type="text"
                  value={eduForm.field || ""}
                  onChange={(e) =>
                    setEduForm({ ...eduForm, field: e.target.value })
                  }
                  placeholder="e.g. Computer Science"
                  className="w-full px-3 py-2 border border-neutral-300 focus:border-black focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="edu-startYear"
                    className="block font-mono text-[10px] uppercase text-neutral-500 mb-1"
                  >
                    Start Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="edu-startYear"
                    type="number"
                    required
                    min={1950}
                    max={new Date().getFullYear() + 10}
                    value={eduForm.startYear}
                    onChange={(e) =>
                      setEduForm({
                        ...eduForm,
                        startYear: Number.parseInt(e.target.value, 10),
                      })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 focus:border-black focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="edu-endYear"
                    className="block font-mono text-[10px] uppercase text-neutral-500 mb-1"
                  >
                    End Year (Or Expected)
                  </label>
                  <input
                    id="edu-endYear"
                    type="number"
                    min={1950}
                    max={new Date().getFullYear() + 15}
                    value={eduForm.endYear || ""}
                    onChange={(e) =>
                      setEduForm({
                        ...eduForm,
                        endYear: e.target.value
                          ? Number.parseInt(e.target.value, 10)
                          : null,
                      })
                    }
                    placeholder="e.g. 2024"
                    className="w-full px-3 py-2 border border-neutral-300 focus:border-black focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="edu-grade"
                  className="block font-mono text-[10px] uppercase text-neutral-500 mb-1"
                >
                  Grade / GPA (Optional)
                </label>
                <input
                  id="edu-grade"
                  type="text"
                  value={eduForm.grade || ""}
                  onChange={(e) =>
                    setEduForm({ ...eduForm, grade: e.target.value })
                  }
                  placeholder="e.g. 3.8 GPA or First Class Honours"
                  className="w-full px-3 py-2 border border-neutral-300 focus:border-black focus:outline-none transition-colors"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsEduModalOpen(false)}
                  className="px-4 py-2 border border-neutral-300 hover:border-black text-xs font-mono uppercase transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
