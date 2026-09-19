"use client";

import { useActionState } from "react";
import {
  adminCreateStaffAccount,
  adminDeleteStaffAccount,
  adminUpdateStaffAccount,
} from "@/app/actions/admin-staff";
import {
  STAFF_ROLE_LABELS,
  STAFF_ROLES,
  type StaffRole,
} from "@/lib/staff/types";

type Account = {
  id: string;
  email: string;
  displayName: string;
  role: StaffRole;
  active: boolean;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export default function StaffAccountsPanel({
  accounts,
  canManage,
}: {
  accounts: Account[];
  canManage: boolean;
}) {
  const [createState, createAction, createPending] = useActionState(
    adminCreateStaffAccount,
    null,
  );

  if (!canManage) {
    return (
      <section className="border border-navy/10 bg-white p-6 shadow-sm">
        <h2 className="font-display text-xl font-semibold text-navy">
          Staff accounts
        </h2>
        <p className="mt-2 text-sm text-muted">
          Only Master Admin and Director can create or edit login accounts.
        </p>
        <ul className="mt-6 divide-y divide-line">
          {accounts.map((account) => (
            <li key={account.id} className="flex items-center justify-between gap-3 py-3 text-sm">
              <div>
                <p className="font-medium text-navy">{account.displayName}</p>
                <p className="text-muted">
                  {account.email} · {STAFF_ROLE_LABELS[account.role]}
                </p>
              </div>
              <span
                className={
                  account.active ? "text-emerald" : "text-crimson"
                }
              >
                {account.active ? "Active" : "Inactive"}
              </span>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <div className="space-y-8">
      <section className="border border-navy/10 bg-gradient-to-br from-navy to-[#0f3358] p-6 text-white shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
          Access control
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold">
          Create staff account
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-white/70">
          Credentials are shown once after creation. No invitation email is
          sent — share passwords through a secure channel only.
        </p>

        <form action={createAction} className="mt-6 grid gap-4 sm:grid-cols-2" encType="multipart/form-data">
          <label className="block text-sm">
            <span className="mb-1.5 block text-white/80">Display name</span>
            <input
              name="displayName"
              required
              className="w-full border border-white/20 bg-white/10 px-3 py-2.5 text-white outline-none placeholder:text-white/40 focus:border-gold"
              placeholder="Full name"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block text-white/80">Email (login)</span>
            <input
              name="email"
              type="email"
              required
              className="w-full border border-white/20 bg-white/10 px-3 py-2.5 text-white outline-none placeholder:text-white/40 focus:border-gold"
              placeholder="name@example.com"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block text-white/80">Role</span>
            <select
              name="role"
              defaultValue="editor"
              className="w-full border border-white/20 bg-[#0b2545] px-3 py-2.5 text-white outline-none focus:border-gold"
            >
              {STAFF_ROLES.filter((r) => r !== "master").map((role) => (
                <option key={role} value={role}>
                  {STAFF_ROLE_LABELS[role]}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block text-white/80">Temporary password</span>
            <input
              name="password"
              type="text"
              required
              minLength={10}
              className="w-full border border-white/20 bg-white/10 px-3 py-2.5 text-white outline-none placeholder:text-white/40 focus:border-gold"
              placeholder="Min. 10 characters"
            />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="mb-1.5 block text-white/80">
              Photo (for directors to recognise them)
            </span>
            <input
              type="file"
              name="photo"
              accept="image/*"
              className="w-full border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white file:mr-3 file:border-0 file:bg-gold file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:tracking-[0.1em] file:text-navy-deep"
            />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={createPending}
              className="bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-navy-deep transition hover:bg-gold-bright disabled:opacity-60"
            >
              {createPending ? "Creating…" : "Create account"}
            </button>
            {createState?.error ? (
              <p className="mt-3 text-sm text-red-200" role="alert">
                {createState.error}
              </p>
            ) : null}
            {createState?.ok && "message" in createState ? (
              <p className="mt-3 text-sm text-emerald-200" role="status">
                {String(createState.message)}
              </p>
            ) : null}
          </div>
        </form>
      </section>

      <section className="border border-navy/10 bg-white shadow-sm">
        <div className="border-b border-line px-6 py-4">
          <h2 className="font-display text-xl font-semibold text-navy">
            Directory of accounts
          </h2>
        </div>
        <ul className="divide-y divide-line">
          {accounts.map((account) => (
            <li key={account.id} className="px-6 py-5">
              <StaffEditRow account={account} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function StaffEditRow({ account }: { account: Account }) {
  const [state, action, pending] = useActionState(adminUpdateStaffAccount, null);
  const isMaster = account.role === "master";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-canvas ring-2 ring-gold/40">
            {account.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={account.photoUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-navy">
                {account.displayName.slice(0, 1).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <p className="font-display text-lg font-semibold text-navy">
              {account.displayName}
            </p>
            <p className="text-sm text-muted">
              {STAFF_ROLE_LABELS[account.role]}
              {isMaster ? " · protected" : ""}
            </p>
          </div>
        </div>
        {!isMaster ? (
          <form action={adminDeleteStaffAccount}>
            <input type="hidden" name="id" value={account.id} />
            <button
              type="submit"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-crimson hover:underline"
              onClick={(e) => {
                if (!confirm(`Delete ${account.displayName}?`)) {
                  e.preventDefault();
                }
              }}
            >
              Delete
            </button>
          </form>
        ) : null}
      </div>

      <form action={action} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" encType="multipart/form-data">
        <input type="hidden" name="id" value={account.id} />
        <label className="block text-sm sm:col-span-1">
          <span className="mb-1 block text-muted">Name</span>
          <input
            name="displayName"
            defaultValue={account.displayName}
            required
            disabled={isMaster}
            className="w-full border border-line px-3 py-2 outline-none focus:border-navy disabled:bg-canvas"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-muted">Email</span>
          <input
            name="email"
            type="email"
            defaultValue={account.email}
            required
            disabled={isMaster}
            className="w-full border border-line px-3 py-2 outline-none focus:border-navy disabled:bg-canvas"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-muted">Role</span>
          <select
            name="role"
            defaultValue={account.role}
            disabled={isMaster}
            className="w-full border border-line px-3 py-2 outline-none focus:border-navy disabled:bg-canvas"
          >
            {isMaster ? (
              <option value="master">{STAFF_ROLE_LABELS.master}</option>
            ) : (
              STAFF_ROLES.filter((r) => r !== "master").map((role) => (
                <option key={role} value={role}>
                  {STAFF_ROLE_LABELS[role]}
                </option>
              ))
            )}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-muted">Status</span>
          <select
            name="active"
            defaultValue={account.active ? "true" : "false"}
            disabled={isMaster}
            className="w-full border border-line px-3 py-2 outline-none focus:border-navy disabled:bg-canvas"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block text-muted">
            Reset password (leave blank to keep)
          </span>
          <input
            name="password"
            type="text"
            minLength={10}
            placeholder="New password"
            className="w-full border border-line px-3 py-2 outline-none focus:border-navy"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block text-muted">Update photo</span>
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="w-full border border-line bg-white px-3 py-2 text-sm file:mr-3 file:border-0 file:bg-navy file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:tracking-[0.1em] file:text-white"
          />
        </label>
        <div className="flex items-end sm:col-span-2">
          <button
            type="submit"
            disabled={pending}
            className="bg-navy px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-navy-mid disabled:opacity-60"
          >
            {pending ? "Saving…" : "Save changes"}
          </button>
          {state?.error ? (
            <p className="ml-3 text-sm text-crimson">{state.error}</p>
          ) : null}
          {state?.ok ? (
            <p className="ml-3 text-sm text-emerald">Saved</p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
