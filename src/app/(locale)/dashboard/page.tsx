// app/dashboard/page.tsx (ou onde seu Dashboard está localizado)
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Dashboard from "@/src/page/dashboardPage";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/login"); // Redireciona se não estiver logado
	}

	return <Dashboard session={session} />;
}
