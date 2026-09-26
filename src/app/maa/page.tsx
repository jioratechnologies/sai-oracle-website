import { redirect } from "next/navigation";

export default async function MaaRedirect({
  searchParams,
}: {
  searchParams?: Promise<{ tab?: string }>;
}) {
  const { tab } = (await searchParams) ?? {};
  if (tab) {
    redirect(`/gurumaa?tab=${encodeURIComponent(tab)}`);
  }
  redirect("/gurumaa");
}
