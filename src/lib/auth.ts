export async function isAuth() {
  try {
    const session = await auth();
    if (!session) {
      redirect("/login");
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { companyId: true },
    });
    if (!user?.companyId) {
      redirect("/company-create");
    }
  } catch (error) {
    console.error("Failed to retrieve application data:", error);
    throw error; // Re-throw error to be handled by the caller
  }
}
