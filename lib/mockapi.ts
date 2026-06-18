export async function fetchMockApiHealth() {
  try {
    const response = await fetch("https://mockapi.io/projects", { next: { revalidate: 3600 } });
    return response.ok;
  } catch {
    return false;
  }
}
