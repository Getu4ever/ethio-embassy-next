"use client";

import Image from "next/image";
import { useActionState } from "react";
import {
  adminCreateEmployee,
  adminDeleteEmployee,
  adminUpdateEmployee,
} from "@/app/actions/admin-employees";
import type { Employee } from "@/lib/cms/employees";

export default function EmployeesPanel({
  employees,
  canEdit,
}: {
  employees: Employee[];
  canEdit: boolean;
}) {
  const [createState, createAction, createPending] = useActionState(
    adminCreateEmployee,
    null,
  );

  return (
    <div className="space-y-8">
      {canEdit ? (
        <section className="border border-navy/10 bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl font-semibold text-navy">
            Add employee
          </h2>
          <p className="mt-1 text-sm text-muted">
            Profiles can appear on About Us when published.
          </p>
          <form action={createAction} className="mt-5 grid gap-4 sm:grid-cols-2" encType="multipart/form-data">
            <Field name="name" label="Full name" required />
            <Field name="role" label="Role / title" required />
            <Field name="email" label="Email" type="email" />
            <Field name="phone" label="Phone" />
            <label className="block text-sm sm:col-span-2">
              <span className="mb-1.5 block font-medium text-charcoal">Bio</span>
              <textarea
                name="bio"
                rows={3}
                className="w-full border border-line px-3 py-2.5 outline-none focus:border-navy"
                placeholder="Short professional biography"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-charcoal">
                Profile photo
              </span>
              <input
                type="file"
                name="photo"
                accept="image/*"
                className="w-full border border-line bg-white px-3 py-2.5 text-sm file:mr-3 file:border-0 file:bg-navy file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:tracking-[0.1em] file:text-white"
              />
            </label>
            <Field name="imageAlt" label="Photo alt text" />
            <input type="hidden" name="imageSrc" value="" />
            <label className="flex items-center gap-2 text-sm sm:col-span-2">
              <input type="checkbox" name="published" defaultChecked className="accent-navy" />
              Published on public site
            </label>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={createPending}
                className="bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-60"
              >
                {createPending ? "Adding…" : "Add employee"}
              </button>
              {createState?.error ? (
                <p className="mt-2 text-sm text-crimson">{createState.error}</p>
              ) : null}
              {createState?.ok ? (
                <p className="mt-2 text-sm text-emerald">Employee added</p>
              ) : null}
            </div>
          </form>
        </section>
      ) : null}

      <section className="space-y-4">
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            canEdit={canEdit}
          />
        ))}
        {employees.length === 0 ? (
          <p className="border border-navy/10 bg-white p-8 text-center text-sm text-muted shadow-sm">
            No employees yet.
          </p>
        ) : null}
      </section>
    </div>
  );
}

function EmployeeCard({
  employee,
  canEdit,
}: {
  employee: Employee;
  canEdit: boolean;
}) {
  const [state, action, pending] = useActionState(adminUpdateEmployee, null);

  return (
    <article className="border border-navy/10 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/50 sm:mx-0">
          <Image
            src={employee.imageSrc}
            alt={employee.imageAlt || employee.name}
            fill
            className="object-cover object-top"
            sizes="112px"
          />
        </div>
        <div className="min-w-0 flex-1">
          {canEdit ? (
            <form action={action} className="grid gap-3 sm:grid-cols-2" encType="multipart/form-data">
              <input type="hidden" name="id" value={employee.id} />
              <input type="hidden" name="sortOrder" value={employee.sortOrder} />
              <Field name="name" label="Name" defaultValue={employee.name} required />
              <Field name="role" label="Role" defaultValue={employee.role} required />
              <Field name="email" label="Email" defaultValue={employee.email} />
              <Field name="phone" label="Phone" defaultValue={employee.phone} />
              <label className="block text-sm sm:col-span-2">
                <span className="mb-1.5 block font-medium text-charcoal">Bio</span>
                <textarea
                  name="bio"
                  rows={3}
                  defaultValue={employee.bio}
                  className="w-full border border-line px-3 py-2.5 outline-none focus:border-navy"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-charcoal">
                  Replace photo
                </span>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  className="w-full border border-line bg-white px-3 py-2.5 text-sm file:mr-3 file:border-0 file:bg-navy file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:tracking-[0.1em] file:text-white"
                />
              </label>
              <Field
                name="imageAlt"
                label="Photo alt"
                defaultValue={employee.imageAlt}
              />
              <input type="hidden" name="imageSrc" value={employee.imageSrc} />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="published"
                  defaultChecked={employee.published}
                  className="accent-navy"
                />
                Published
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={pending}
                  className="bg-navy px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white disabled:opacity-60"
                >
                  {pending ? "Saving…" : "Save"}
                </button>
                {state?.error ? (
                  <span className="text-sm text-crimson">{state.error}</span>
                ) : null}
                {state?.ok ? (
                  <span className="text-sm text-emerald">Saved</span>
                ) : null}
              </div>
            </form>
          ) : (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                {employee.role}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-navy">
                {employee.name}
              </h3>
              <p className="mt-2 text-sm text-muted">{employee.bio}</p>
              <p className="mt-3 text-sm text-charcoal">
                {[employee.email, employee.phone].filter(Boolean).join(" · ") ||
                  "No contact listed"}
              </p>
            </div>
          )}
        </div>
      </div>
      {canEdit ? (
        <form action={adminDeleteEmployee} className="mt-4 border-t border-line pt-4">
          <input type="hidden" name="id" value={employee.id} />
          <button
            type="submit"
            className="text-xs font-semibold uppercase tracking-[0.12em] text-crimson hover:underline"
            onClick={(e) => {
              if (!confirm(`Delete ${employee.name}?`)) e.preventDefault();
            }}
          >
            Delete employee
          </button>
        </form>
      ) : null}
    </article>
  );
}

function Field({
  name,
  label,
  defaultValue,
  required,
  type = "text",
  placeholder,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-charcoal">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="w-full border border-line px-3 py-2.5 outline-none focus:border-navy"
      />
    </label>
  );
}
