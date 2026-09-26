import { redirect } from "next/navigation";

export default function MeditationRedirect() {
  redirect("/gurumaa?tab=meditation");
}
