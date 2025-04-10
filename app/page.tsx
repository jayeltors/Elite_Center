import DashboardWrapper from "../components/dashboard-wrapper";

export default async function Page() {
  const res = await fetch("http://127.0.0.1:3000/api/analytics", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch analytics data");
  }

  const data = await res.json();

  return <DashboardWrapper data={data} />;
}
